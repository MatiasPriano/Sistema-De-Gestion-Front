import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import Input from './input';
import AutocompleteInput from './autocomplete';
import TextArea from './textArea';
import ComboBox from './comboBox';
import ButtonRow, { ButtonChoice } from './buttonRow';
import getClients, { Client } from '@/services/clientService';
import getResources, { Resource } from '@/services/resourceService';

interface TicketProps {
    productId: string;
    versionId: string;
    ticketId?: string;
    title?: string;
    responsable?: string;
    description?: string;
    state?: string;
    severity?: string | null;
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
    severity = null, client = '', titleDisabled = false, responsableDisabled = false,
    descriptionDisabled = false, stateDisabled = false, severityDisabled = false, clientDisabled = false,
    mode}: TicketProps) {
    const [formTitle, setFormTitle] = useState(title);
    const [formClient, setFormClient] = useState(client);
    const [formResponsable, setFormResponsable] = useState(responsable);
    const [formDescription, setFormDescription] = useState(description);
    const [formState, setFormState] = useState(state);
    const [severityChoice, setSeverityChoice] = useState<string | null>(severity)

    const [titleError, setTitleError] = useState<boolean>(false);
    const [descriptionError, setDescriptionError] = useState<boolean>(false);
    const [clientError, setClientError] = useState<boolean>(false);
    const [severityError, setSeverityError] = useState<boolean>(false);

    const stateOptions: string[] = ["Nuevo", "En progreso", "Esperando cliente", "Esperando desarrollo",
        "Resuelto a confirmar", "Cerrado", "Bloqueado"
    ]

    const severityChoices: ButtonChoice[] = [
        { title: "S1", colour: "red" }, 
        { title: "S2", colour: "orange" }, 
        { title: "S3", colour: "yellow" }, 
        { title: "S4", colour: "green" }, 
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

    const [clients, setClients] = useState([])
    useEffect(() => {
        getClients().then((data) => {
            setClients(data.map(
                (client: Client) => {
                    return {
                        id: client.id,
                        name: `${client['razon social']} - ${client.CUIT}`
                    }
                }
            ))
        }).catch((e) => console.log(e))
    }, [])

    const router = useRouter()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault()

        if (formTitle.trim() && formClient.trim() && formDescription.trim() && severityChoice != null) {
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
            if (severityChoice === null) {
                setSeverityError(true)
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

    const handleFocusSeverity = () => {
        setSeverityError(false)
    }

    const handleCancelButton = () => {
        router.push(`/products/${productId}/${versionId}/`)
    }

    const handleBackButton = () => {
        router.push(`/products/${productId}/${versionId}/`)
    }

    const handleTasksButton = () => {
        router.push(`/products/${productId}/${versionId}/${ticketId}/tasks`)
    }

    const handleEditButton = () => {
        router.push(`/products/${productId}/${versionId}/${ticketId}/edit`)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <main className="grid gap-x-6 gap-y-4 sm:grid-cols-1 md:grid-cols-2 bg-gray-200 px-4 py-8 rounded-xl">
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
                                    items={resources}
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
                    <ButtonRow      title="Severidad"
                                    choices={severityChoices}
                                    selectedChoice={severityChoice}
                                    setSelected={setSeverityChoice}
                                    isObligatory={true}
                                    error={severityError}
                                    handleFocus={handleFocusSeverity}
                                    disabled={severityDisabled}/>
                </div>
                <AutocompleteInput  title='Cliente'
                                    placeholder='PSA - Soporte'
                                    value={formClient}
                                    setValue={setFormClient}
                                    isObligatory={true}
                                    error={clientError}
                                    handleFocus={handleFocusClient}
                                    items={clients}
                                    disabled={clientDisabled}
                />
            </main>
            
            {mode === TicketMode.View && 
            <div className='flex'>
                <div className="flex items-center justify-start gap-x-6 px-4">
                    <button
                    type="button"
                    onClick={handleBackButton}
                    className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-colors duration-300 ease-in-out hover:text-gray-600"
                    >
                        Volver
                    </button>
                </div>
                <div className="flex items-center justify-end gap-x-6 px-4 w-full">
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
                </div>
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
