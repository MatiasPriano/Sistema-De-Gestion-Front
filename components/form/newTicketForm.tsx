import Ticket from "@/types/ticket"
import Input from "../input/input"
import { useState } from "react"
import AutocompleteInput from "../input/autocomplete"
import TextArea from "../input/textArea"
import ComboBox from "../input/comboBox"
import ButtonRow, { ButtonOption } from "../button/buttonRow"
import TextButton from "../button/textButton"
import { toast } from 'react-hot-toast';
import Employee from "@/types/employee"
import { Client } from "@/types/client"
import { Status } from "@/types/status"
import NewTicket from "@/types/newTicket"
import { Severity } from "@/types/severity"
import { TicketInputs } from "@/types/ticketInputs"

const statusOptions: Status[] =
    [
        "NUEVO",
        "EN_PROGRESO",
        "ESPERANDO_CLIENTE",
        "ESPERANDO_DESARROLLO",
        "RESUELTO_A_CONFIRMAR",
        "CERRADO",
        "BLOQUEADO"
    ]

const severityOptions: ButtonOption[] =
    [
        {title: "S1", colour: "red" },
        {title: "S2", colour: "orange" },
        {title: "S3", colour: "yellow" },
        {title: "S4", colour: "green" },
    ]

export interface TicketFormProps {
    newTicket: NewTicket
    setNewTicket: (newTicket: NewTicket) => void
    disabledInputs: TicketInputs
    requiredInputs: TicketInputs
    submitButtonName: string
    onSubmit: () => void
    onCancel: () => void
    employees: Employee[]
    clients: Client[]
}

export default function TicketForm(
    {
        newTicket,
        setNewTicket,
        disabledInputs,
        requiredInputs,
        submitButtonName,
        onSubmit,
        onCancel,
        employees,
        clients
    } : TicketFormProps) {
        const [invalidInputs, setInvalidInputs] = useState<TicketInputs>(
            {
                title: false,
                description: false,
                employee: false,
                status: false,
                severity: false,
                client: false,
            }
        )

        const setTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
            setNewTicket({ ...newTicket, title: event.target.value })
        }
        const handleTitleFocus = () => {
            setInvalidInputs({...invalidInputs, title: false})
        }

        const setEmployeeId = (employeeId: number | null) => {
            setNewTicket({ ...newTicket, employeeId: employeeId })
        }
        const handleEmployeeFocus = () => {
            setInvalidInputs({ ...invalidInputs, employee: false })
        }

        const setDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            setNewTicket({ ...newTicket, description: event.target.value })
        }
        const handleDescriptionFocus = () => {
            setInvalidInputs({ ...invalidInputs, description: false })
        }

        const setStatus = (status: string) => {
            setNewTicket({ ...newTicket, status: status as Status })
        }

        const setSeverity = (severity: string | null) => {
            setNewTicket({ ...newTicket, severity: severity as Severity })
        }
        const handleSeverityFocus = () => {
            setInvalidInputs({ ...invalidInputs, severity: false })
        }

        const setClient = (clientId: number | null) => {
            setNewTicket({ ...newTicket, clientId: clientId })
        }
        const handleClientFocus = () => {
            setInvalidInputs({ ...invalidInputs, client: false })
        }

        const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault()

            const finalInvalidInputs: TicketInputs = {
                title: requiredInputs.title && newTicket.title.trim() === "",
                employee: !disabledInputs.employee && requiredInputs.employee && (newTicket.employeeId === null || !employees.map((employee) => employee.legajo).includes(newTicket.employeeId)),
                description: requiredInputs.description && newTicket.description.trim() === "",
                status: requiredInputs.status && !statusOptions.includes(newTicket.status),
                severity: requiredInputs.severity && (newTicket.severity === null || !["S1", "S2", "S3", "S4"].includes(newTicket.severity)),
                client: !disabledInputs.client && requiredInputs.client && (newTicket.clientId === null || !clients.map((client) => client.id).includes(newTicket.clientId)),
            }
            if (!finalInvalidInputs.title &&
                !finalInvalidInputs.employee &&
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
                <main className="grid gap-x-6 gap-y-4 sm:grid-cols-1 md:grid-cols-2 border bg-backgroundContainer border-border shadow-lg px-4 py-8 rounded-xl">
                    <Input  
                        title="Título"
                        placeholder="TKT-001"
                        value={newTicket.title}
                        setValue={setTitle}
                        error={invalidInputs.title}
                        handleFocus={handleTitleFocus}
                        isRequired={requiredInputs.title}
                        disabled={disabledInputs.title} />
                    <AutocompleteInput
                        title="Responsable"
                        placeholder="Juan Perez"
                        value={newTicket.employeeId}
                        setValue={setEmployeeId}
                        error={invalidInputs.employee}
                        errorText="El responsable debe ser valido"
                        handleFocus={handleEmployeeFocus}
                        isRequired={requiredInputs.employee}
                        items={employees.map((employee) => {return { id: employee.legajo, name: employee.Nombre + " " + employee.Apellido }})}
                        disabled={disabledInputs.employee} />
                    <div className="col-span-full">
                        <TextArea
                            title="Descripción"
                            value={newTicket.description}
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
                            selected={newTicket.status}
                            disabled={disabledInputs.status}
                            onChange={setStatus} />
                        <ButtonRow
                            title="Severidad"
                            options={severityOptions}
                            selected={newTicket.severity}
                            setSelected={setSeverity}
                            isRequired={requiredInputs.severity}
                            error={invalidInputs.severity}
                            handleFocus={handleSeverityFocus}
                            disabled={disabledInputs.severity} />
                    </div>
                    <AutocompleteInput
                        title='Cliente'
                        placeholder='PSA - Soporte'
                        value={newTicket.clientId}
                        setValue={setClient}
                        isRequired={requiredInputs.client}
                        error={invalidInputs.client}
                        errorText="El cliente debe ser valido"
                        handleFocus={handleClientFocus}
                        items={clients.map((client) => {return { id: client.id, name: client["razon social"]}})}
                        disabled={disabledInputs.client} />
                    <div className='flex col-span-full pt-2'>
                        <div className="flex items-center justify-end gap-x-6 px-4 w-full">
                            <TextButton
                                name="Cancelar"
                                style="transparent"
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
