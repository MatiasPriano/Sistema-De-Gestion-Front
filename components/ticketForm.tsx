import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import Input from './input';
import AutocompleteInput from './autocomplete';
import TextArea from './textArea';
import ComboBox from './comboBox';

interface TicketProps {
    productId: string;
    versionId: string;
    ticketId?: string;
    title?: string;
    responsable?: string;
    description?: string;
    state?: string;
    severity?: string;
    client?: string;
    titleDisabled?: boolean;
    responsableDisabled?: boolean;
    descriptionDisabled?: boolean;
    stateDisabled?: boolean;
    severityDisabled?: boolean;
    clientDisabled?: boolean;
    includeButtons?: boolean;
    mode: TicketMode;
}

export enum TicketMode {
    New, Edit, View
}

export default function TicketForm({ productId, versionId, ticketId = "", title = '', responsable = '', description = '', state = 'Nuevo',
    severity = 'S1', client = '', titleDisabled = false, responsableDisabled = false,
    descriptionDisabled = false, stateDisabled = false, severityDisabled = false, clientDisabled = false,
    mode}: TicketProps) {
    const [formTitle, setFormTitle] = useState(title);
    const [formClient, setFormClient] = useState(client);
    const [formResponsable, setFormResponsable] = useState(responsable);
    const [formDescription, setFormDescription] = useState(description);
    const [formState, setFormState] = useState(state);
    const [formSeverity, setFormSeverity] = useState(severity);

    const [titleError, setTitleError] = useState<boolean>(false);
    const [descriptionError, setDescriptionError] = useState<boolean>(false);
    const [clientError, setClientError] = useState<boolean>(false);

    const [clientSuggestions, setClientSuggestions] = useState<string[]>([]);
    const [responsableSuggestions, setResponsableSuggestions] = useState<string[]>([]);

    const stateOptions: string[] = ["Nuevo", "En progreso", "Esperando cliente", "Esperando desarrollo",
        "Resuelto esperando confirmacion", "Cerrado", "Bloqueado"
    ]
    const severityOptions: string[] = ["S1", "S2", "S3", "S4"]

    const router = useRouter()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault()

        if (formTitle.trim() && formClient.trim() && formDescription.trim()) {
                if (mode === TicketMode.New) {
                    toast.success('Ticket creado exitosamente')
                    setFormTitle("")
                    setFormDescription("")
                } else {
                    toast.success('Cambios guardados exitosamente')
                    router.push(`/products/${productId}/${versionId}/${ticketId}`)
                }
            
        } else {
            if (!formTitle.trim()) {
                setTitleError(true)
            }
            if (!formDescription.trim()) {
                setDescriptionError(true)
            }
            if (!formClient.trim()) {
                setClientError(true)
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
    const handleFocusClient = () => {
        setClientError(false)
    }
    const handleCancelButton = () => {
        router.push(`/products/${productId}/${versionId}/`)
    }

    const handleTasksButton = () => {
        router.push(`/products/${productId}/${versionId}/${ticketId}/tasks`)
    }

    const handleEditButton = () => {
        router.push(`/products/${productId}/${versionId}/${ticketId}/edit`)
    }

    const mockHandleResponsableSuggestions = (_input: string) => {
        setResponsableSuggestions(["Juan Perez", "Roberto Lopez", "Mariano Martinez"])
    }

    const mockHandleClientSuggestions = (_input: string) => {
        setClientSuggestions(["Volkswagen", "Fiat", "Ford"])
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <main className="grid gap-x-6 gap-y-8 sm:grid-cols-1 md:grid-cols-2 bg-gray-200 p-6 rounded-xl">
                <Input  title="Título"
                        placeholder="TKT-001"
                        value={formTitle}
                        setValue={setFormTitle}
                        error={titleError}
                        handleFocus={handleFocusTitle}
                        isObligatory={true}
                        disabled={titleDisabled}
                />
                <AutocompleteInput  title="Responsable"
                                    placeholder="Juan Perez"
                                    value={formResponsable}
                                    setValue={setFormResponsable}
                                    isObligatory={false}
                                    suggestions={responsableSuggestions}
                                    handleSuggestions={mockHandleResponsableSuggestions}
                                    disabled={responsableDisabled}
                />
                <div className="col-span-full">
                    <TextArea   title="Descripción"
                                value={formDescription}
                                setValue={setFormDescription}
                                placeholder="El usuario describe que no puede descargar ultima factura emitida."
                                isObligatory={true}
                                error={descriptionError}
                                handleFocus={handleFocusDescription}
                                disabled={descriptionDisabled}/>
                </div>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                    <ComboBox   title="Estado"
                                options={stateOptions}
                                selected={formState}
                                disabled={stateDisabled}
                                onChange={setFormState}/>
                    <ComboBox   title="Severidad"
                                selected={formSeverity}
                                options={severityOptions}
                                disabled={severityDisabled}
                                onChange={setFormSeverity}/>
                </div>
                <AutocompleteInput  title='Cliente'
                                    placeholder='PSA - Soporte'
                                    value={formClient}
                                    setValue={setFormClient}
                                    isObligatory={true}
                                    error={clientError}
                                    handleFocus={handleFocusClient}
                                    suggestions={clientSuggestions}
                                    handleSuggestions={mockHandleClientSuggestions}
                                    disabled={clientDisabled}
                />
            </main>
            
            {mode === TicketMode.View && 
            <div className="flex items-center justify-end gap-x-6 px-4">
                <button
                type="button"
                onClick={handleTasksButton}
                className="rounded-md bg-amber-500 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-colors duration-300 ease-in-out hover:bg-amber-200"
                >
                    Tareas
                </button>
                <button
                type="button"
                onClick={handleEditButton}
                className="rounded-md bg-blue-950 px-3 py-2 text-sm font-semibold text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-colors duration-300 ease-in-out hover:bg-blue-800"
                >
                    Editar
                </button>
            </div>}
            {mode != TicketMode.View && (
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
                        {mode === TicketMode.New ? "Crear" : "Guardar"}
                    </button>
                </div>)
            }
        </form>
    )
}
