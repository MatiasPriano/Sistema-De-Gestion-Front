import Ticket, { Severity, Status } from "@/types/ticket"
import Input from "../input/input"
import { useState } from "react"
import AutocompleteInput from "../input/autocomplete"
import TextArea from "../input/textArea"
import ComboBox from "../input/comboBox"
import ButtonRow, { ButtonOption } from "../button/buttonRow"
import TextButton from "../button/textButton"
import { toast } from 'react-hot-toast';

const statusOptions: Status[] =
    [
        "Nuevo",
        "En progreso",
        "Esperando cliente",
        "Esperando desarrollo",
        "Resuelto a confirmar",
        "Cerrado",
        "Bloqueado"
    ]

const severityOptions: ButtonOption[] =
    [
        {title: "S1", colour: "red" },
        {title: "S2", colour: "orange" },
        {title: "S3", colour: "yellow" },
        {title: "S4", colour: "green" },
    ]

export interface TicketInputs {
    [key: string]: boolean
    title: boolean
    description: boolean
    responsable: boolean
    status: boolean
    severity: boolean
    client: boolean
}

export interface TicketFormProps {
    ticket: Ticket
    setTicket: (ticket: Ticket) => void
    disabledInputs: TicketInputs
    requiredInputs: TicketInputs
    submitButtonName: string
    onSubmit: () => void
    onCancel: () => void
    resources: string[]
    clients: string[]
}

export default function TicketForm(
    {
        ticket,
        setTicket,
        disabledInputs,
        requiredInputs,
        submitButtonName,
        onSubmit,
        onCancel,
        resources,
        clients
    } : TicketFormProps) {
        const [invalidInputs, setInvalidInputs] = useState<TicketInputs>(
            {
                title: false,
                description: false,
                responsable: false,
                status: false,
                severity: false,
                client: false,
            }
        )

        const setTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
            setTicket({ ...ticket, title: event.target.value })
        }
        const handleTitleFocus = () => {
            setInvalidInputs({...invalidInputs, title: false})
        }

        const setResponsable = (responsable: string) => {
            setTicket({ ...ticket, responsable: responsable })
        }
        const handleResponsableFocus = () => {
            setInvalidInputs({ ...invalidInputs, responsable: false })
        }

        const setDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            setTicket({ ...ticket, description: event.target.value })
        }
        const handleDescriptionFocus = () => {
            setInvalidInputs({ ...invalidInputs, description: false })
        }

        const setStatus = (status: string) => {
            setTicket({ ...ticket, status: status as Status })
        }

        const setSeverity = (severity: string | null) => {
            setTicket({ ...ticket, severity: severity as Severity })
        }
        const handleSeverityFocus = () => {
            setInvalidInputs({ ...invalidInputs, severity: false })
        }

        const setClient = (client: string) => {
            setTicket({ ...ticket, client: client })
        }
        const handleClientFocus = () => {
            setInvalidInputs({ ...invalidInputs, client: false })
        }

        const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault()

            const finalInvalidInputs: TicketInputs = {
                title: requiredInputs.title && ticket.title.trim() === "",
                responsable: requiredInputs.responsable && !resources.includes(ticket.responsable),
                description: requiredInputs.description && ticket.description.trim() === "",
                status: requiredInputs.status && !statusOptions.includes(ticket.status),
                severity: requiredInputs.severity && !["S1", "S2", "S3", "S4"].includes(ticket.severity),
                client: requiredInputs.client && !clients.includes(ticket.client),
            }
            console.log(ticket)
            console.log(invalidInputs)
            console.log()
            if (!finalInvalidInputs.title &&
                !finalInvalidInputs.responsable &&
                !finalInvalidInputs.description &&
                !finalInvalidInputs.status &&
                !finalInvalidInputs.severity &&
                !finalInvalidInputs.client) {
                    onSubmit()
            } else {
                setInvalidInputs(finalInvalidInputs)
                toast.error("Existen campos incompletos")
            }
        }

        return (
            <form onSubmit={handleSubmit} className="space-y-4">
                <main className="grid gap-x-6 gap-y-4 sm:grid-cols-1 md:grid-cols-2 border bg-background border-backgroundAccent shadow px-4 py-8 rounded-xl">
                    <Input  
                        title="Título"
                        placeholder="TKT-001"
                        value={ticket.title}
                        setValue={setTitle}
                        error={invalidInputs.title}
                        handleFocus={handleTitleFocus}
                        isRequired={requiredInputs.title}
                        disabled={disabledInputs.title} />
                    <AutocompleteInput
                        title="Responsable"
                        placeholder="Juan Perez"
                        value={ticket.responsable}
                        setValue={setResponsable}
                        error={invalidInputs.responsable}
                        errorText="El responsable debe ser valido"
                        handleFocus={handleResponsableFocus}
                        isRequired={requiredInputs.responsable}
                        items={resources}
                        disabled={disabledInputs.responsable} />
                    <div className="col-span-full">
                        <TextArea
                            title="Descripción"
                            value={ticket.description}
                            setValue={setDescription}
                            placeholder="El usuario describe que no puede descargar ultima factura emitida."
                            isRequired={requiredInputs.description}
                            error={invalidInputs.description}
                            handleFocus={handleDescriptionFocus}
                            disabled={disabledInputs.description} />
                    </div>
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                        <ComboBox
                            title="Estado"
                            options={statusOptions}
                            selected={ticket.status}
                            disabled={disabledInputs.status}
                            onChange={setStatus} />
                        <ButtonRow
                            title="Severidad"
                            options={severityOptions}
                            selected={ticket.severity}
                            setSelected={setSeverity}
                            isRequired={requiredInputs.severity}
                            error={invalidInputs.severity}
                            handleFocus={handleSeverityFocus}
                            disabled={disabledInputs.severity} />
                    </div>
                    <AutocompleteInput
                        title='Cliente'
                        placeholder='PSA - Soporte'
                        value={ticket.client}
                        setValue={setClient}
                        isRequired={requiredInputs.client}
                        error={invalidInputs.client}
                        errorText="El cliente debe ser valido"
                        handleFocus={handleClientFocus}
                        items={clients}
                        disabled={disabledInputs.client} />
                    <div className='flex col-span-full pt-2'>
                        <div className="flex items-center justify-end gap-x-6 px-4 w-full">
                            <TextButton
                                name="Cancelar"
                                style="subtle"
                                onClick={onCancel} />
                            <TextButton
                                name={submitButtonName}
                                type="submit"
                                style="primary" />
                        </div>
                    </div>
                </main>
            </form>
        )
}
