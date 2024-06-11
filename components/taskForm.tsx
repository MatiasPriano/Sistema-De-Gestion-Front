import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';

interface TaskProps {
    productId: string;
    versionId: string;
    ticketId: string;
    title?: string;
    responsable?: string;
    description?: string;
}

export default function TaskForm({ productId, versionId, ticketId = "", title = '',
    responsable = '', description = ''}: TaskProps) {
    const [formTitle, setFormTitle] = useState(title);
    const [formResponsable, setFormResponsable] = useState(responsable);
    const [formDescription, setFormDescription] = useState(description);
    const [titleError, setTitleError] = useState<boolean>(false);
    const [descriptionError, setDescriptionError] = useState<boolean>(false);

    const router = useRouter()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault()

        if (formTitle.trim() && formDescription.trim()) {
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

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-12 bg-gray-200 pl-10 pr-10 pt-1 pb-10 rounded-md">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                            Titulo
                        </label>
                        <div className="mt-2">
                            <input
                            type="text"
                            value={formTitle}
                            onChange={(e) => setFormTitle(e.target.value)}
                            name="title"
                            id="title"
                            onFocus={handleFocusTitle}
                            className={`block w-full pl-2 pr-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${titleError ? 'ring-red-500' : 'ring-gray-300'} placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                            placeholder="Tarea-001"
                            />
                            <small className={`text-red-500 absolute mt-1 transition-opacity duration-300 ${titleError ? 'opacity-100' : 'opacity-0'}`}>Este campo es obligatorio.</small>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="responsable" className="block text-sm font-medium leading-6 text-gray-900">
                            Responsable {"(opcional)"}
                        </label>
                        <div className="mt-2">
                            <input
                            type="text"
                            value={formResponsable}
                            onChange={(e) => setFormResponsable(e.target.value)}
                            name="responsable"
                            id="responsable"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="Juan Perez"
                            style={{ paddingLeft: '10px', paddingRight: '10px' }}
                            />
                        </div>
                    </div>
                    <div className="col-span-full">
                        <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                            Descripción
                        </label>
                        <div className="mt-2">
                            <textarea
                            value={formDescription}
                            onChange={(e) => setFormDescription(e.target.value)}
                            id="description"
                            name="description"
                            rows={3}
                            className={`block w-full pl-2 pr-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${descriptionError ? 'ring-red-500' : 'ring-gray-300'} placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus:ring-opacity-50 transition-colors duration-300 ease-in-out sm:text-sm sm:leading-6`}
                            defaultValue={''}
                            onFocus={handleFocusDescription}
                            placeholder="El usuario describe que no puede descargar ultima factura emitida."
                            />
                            <small className={`text-red-500 absolute mt-1 transition-opacity duration-300 ${descriptionError ? 'opacity-100' : 'opacity-0'}`}>Este campo es obligatorio.</small>
                        </div>
                    </div>
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
