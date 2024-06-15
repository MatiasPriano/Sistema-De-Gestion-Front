import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import Input from './input';
import AutocompleteInput from './autocomplete';
import TextArea from './textArea';
import getResources, { Resource } from '@/services/resourceService';
import ButtonRow, { ButtonChoice } from './buttonRow';

interface TaskProps {
    productId: string;
    versionId: string;
    ticketId: string;
    title?: string;
    responsable?: string;
    description?: string;
    project?: string;
    priority?: string | null;
}

export default function TaskForm({ productId, versionId, ticketId = "", title = "",
    responsable = "", description = "", project = "", priority = null}: TaskProps) {
    const [formTitle, setFormTitle] = useState(title);
    const [formResponsable, setFormResponsable] = useState(responsable);
    const [formDescription, setFormDescription] = useState(description);
    const [formProject, setFormProject] = useState(project);
    const [priorityChoice, setPriorityChoice] = useState(priority);

    const [titleError, setTitleError] = useState<boolean>(false);
    const [descriptionError, setDescriptionError] = useState<boolean>(false);
    const [projectError, setProjectError] = useState<boolean>(false);
    const [priorityError, setPriorityError] = useState<boolean>(false);

    const router = useRouter()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault()

        if (formTitle.trim() && formDescription.trim() && formProject.trim() && priorityChoice) {
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
            if (priorityChoice === null) {
                setPriorityError(true)
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

    const handleFocusPriority = () => {
        setPriorityError(false)
    }

    const handleCancelButton = () => {
        router.push(`/products/${productId}/${versionId}/${ticketId}/tasks/`)
    }

    const mockProjectItems = [
        {  
            id: 1,
            name: "Proyecto 1"
        },
        {  
            id: 2,
            name: "Proyecto 2"
        },
        {  
            id: 3,
            name: "Proyecto 3"
        },
    ]

    const [resources, setResources] = useState([])
    useEffect(() => {
        getResources().then((data) => {
            setResources(data.map(
                (resource: Resource) => {
                    return {
                        id: resource.legajo,
                        name: `${resource.Nombre} ${resource.Apellido}`
                    }
                }
            ))
        }).catch((e) => console.log(e))
    }, [])

    const priorityChoices: ButtonChoice[] = [
        { title: "Baja", colour: "green" }, 
        { title: "Media", colour: "orange" }, 
        { title: "Alta", colour: "red" }, 
    ]

    return (
        <form onSubmit={handleSubmit}>
            <main className="grid gap-x-6 gap-y-4 sm:grid-cols-1 md:grid-cols-2 bg-gray-200 px-4 py-8 rounded-xl">
                    <Input  
                        title="Título"
                        placeholder={'Tarea-001'}
                        value={formTitle}
                        setValue={setFormTitle}
                        error={titleError}
                        handleFocus={handleFocusTitle}
                        isObligatory={true}/>
                    <AutocompleteInput  
                        title="Responsable"
                        placeholder='Juan Perez'
                        value={formResponsable}
                        setValue={setFormResponsable}
                        isObligatory={false}
                        items={resources}/>
                    <div className="col-span-full">
                        <TextArea
                            title="Descripción"
                            value={formDescription}
                            setValue={setFormDescription}
                            placeholder="El usuario describe que no puede descargar ultima factura emitida."
                            isObligatory={true}
                            error={descriptionError}
                            handleFocus={handleFocusDescription}/>
                    </div>
                    <AutocompleteInput
                        title='Proyecto'
                        placeholder='Sistema UPP - 2024'
                        value={formProject}
                        setValue={setFormProject}
                        error={projectError}
                        isObligatory={true}
                        items={mockProjectItems}/>
                    <ButtonRow
                        title="Prioridad"
                        choices={priorityChoices}
                        selectedChoice={priorityChoice}
                        setSelected={setPriorityChoice}
                        isObligatory={true}
                        error={priorityError}
                        handleFocus={handleFocusPriority}/>
            </main>
            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                    type="button"
                    onClick={handleCancelButton}
                    className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-colors duration-300 ease-in-out hover:text-gray-600">
                    Cancelar
                </button>
                <button
                    type="submit"
                    className="rounded-md bg-blue-950 px-3 py-2 text-sm font-semibold text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-colors duration-300 ease-in-out hover:bg-blue-800">
                    Crear
                </button>
            </div>
        </form>
    )
}
