import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import Input from './input';
import AutocompleteInput from './autocomplete';
import TextArea from './textArea';

interface TaskProps {
    productId: string;
    versionId: string;
    ticketId: string;
    title?: string;
    responsable?: string;
    description?: string;
    project?: string;
}

export default function TaskForm({ productId, versionId, ticketId = "", title = "",
    responsable = "", description = "", project = ""}: TaskProps) {
    const [formTitle, setFormTitle] = useState(title);
    const [formResponsable, setFormResponsable] = useState(responsable);
    const [formDescription, setFormDescription] = useState(description);
    const [formProject, setFormProject] = useState(project);
    
    const [titleError, setTitleError] = useState<boolean>(false);
    const [descriptionError, setDescriptionError] = useState<boolean>(false);
    const [projectError, setProjectError] = useState<boolean>(false);

    const [projectSuggestions, setProjectSuggestions] = useState<string[]>([]);

    const router = useRouter()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault()

        if (formTitle.trim() && formDescription.trim() && formProject.trim()) {
                toast.success('Tarea creada exitosamente')
                setFormTitle("")
                setFormDescription("")
                router.push(`/products/${productId}/${versionId}/${ticketId}/tasks/`)
        } else {
            if (!formTitle.trim()) {
                setTitleError(true)
            }
            if (!formDescription.trim()) {
                setDescriptionError(true)
            }
            if (!formProject.trim()) {
                setProjectError(true)
            }
            toast.error("Existen campos incompletos")
        }
    };

    const handleFocusTitle = () => {
        setTitleError(false)
    }
    const handleFocusDescription = () => {
        setDescriptionError(false)
    }
    const handleCancelButton = () => {
        router.push(`/products/${productId}/${versionId}/${ticketId}/tasks/`)
    }
    const handleFocusProject = () => {
        setProjectError(false)
    }

    const mockHandleSuggestions = (_input: string) => {
        setProjectSuggestions(["Proyecto 1", "Proyecto 2", "Proyecto 3"])
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-12 bg-gray-200 pl-10 pr-10 pt-1 pb-10 rounded-md">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                    <Input  title="Título"
                            placeholder={'Tarea-001'}
                            value={formTitle}
                            setValue={setFormTitle}
                            error={titleError}
                            handleFocus={handleFocusTitle}
                            isObligatory={true}/>
                    <Input  title="Responsable"
                            placeholder='Juan Perez'
                            value={formResponsable}
                            setValue={setFormResponsable}
                            isObligatory={false} />
                    <div className="col-span-full">
                        <TextArea   title="Descripción"
                                    value={formDescription}
                                    setValue={setFormDescription}
                                    placeholder="El usuario describe que no puede descargar ultima factura emitida."
                                    isObligatory={true}
                                    error={descriptionError}
                                    handleFocus={handleFocusDescription}/>
                    </div>
                    <AutocompleteInput  title='Proyecto'
                                        placeholder='Sistema UPP - 2024'
                                        value={formProject}
                                        setValue={setFormProject}
                                        handleFocus={handleFocusProject}
                                        error={projectError}
                                        isObligatory={true}
                                        suggestions={projectSuggestions}
                                        handleSuggestions={mockHandleSuggestions}/>
                </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                type="button"
                onClick={handleCancelButton}
                className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-colors duration-300 ease-in-out hover:text-gray-600"
                >
                    Cancelar
                </button>
                <button
                type="submit"
                className="rounded-md bg-blue-950 px-3 py-2 text-sm font-semibold text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-colors duration-300 ease-in-out hover:bg-blue-800"
                >
                    Crear
                </button>
            </div>
        </form>
    )
}
