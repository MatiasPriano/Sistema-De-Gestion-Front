import Input from "../input/input"
import { useState } from "react"
import AutocompleteInput from "../input/autocomplete"
import TextArea from "../input/textArea"
import ComboBox from "../input/comboBox"
import ButtonRow, { ButtonOption } from "../button/buttonRow"
import TextButton from "../button/textButton"
import { toast } from 'react-hot-toast';
import Employee from "@/types/employee"
import EditTicket from "@/types/editTicket"
import { TicketInputs } from "@/types/ticketInputs"
import { Status } from "@/types/status"
import { Severity } from "@/types/severity"

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
    
export interface EditTicketFormProps {
    editTicket: EditTicket
    setEditTicket: (editTicket: EditTicket) => void
    disabledInputs: TicketInputs
    requiredInputs: TicketInputs
    submitButtonName: string
    onSubmit: () => void
    onCancel: () => void
    employees: Employee[]
}

export default function TicketForm(
    {
        editTicket: editTicket,
        setEditTicket: setTicket,
        disabledInputs,
        requiredInputs,
        submitButtonName,
        onSubmit,
        onCancel,
        employees,
    } : EditTicketFormProps) {
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
            setTicket({ ...editTicket, title: event.target.value })
        }
        const handleTitleFocus = () => {
            setInvalidInputs({...invalidInputs, title: false})
        }

        const setEmployeeId = (employeeId: number | null) => {
            setTicket({ ...editTicket, employeeId: employeeId })
        }
        const handleEmployeeFocus = () => {
            setInvalidInputs({ ...invalidInputs, employee: false })
        }

        const setDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            setTicket({ ...editTicket, description: event.target.value })
        }
        const handleDescriptionFocus = () => {
            setInvalidInputs({ ...invalidInputs, description: false })
        }

        const setStatus = (status: string) => {
            setTicket({ ...editTicket, status: status as Status })
        }

        const setSeverity = (severity: string | null) => {
            setTicket({ ...editTicket, severity: severity as Severity })
        }
        const handleSeverityFocus = () => {
            setInvalidInputs({ ...invalidInputs, severity: false })
        }

        const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault()

            const finalInvalidInputs: TicketInputs = {
                title: requiredInputs.title && editTicket.title.trim() === "",
                employee: !disabledInputs.responsable && requiredInputs.responsable && (editTicket.employeeId === null || !employees.map((employee) => employee.legajo).includes(editTicket.employeeId)),
                description: requiredInputs.description && editTicket.description.trim() === "",
                status: requiredInputs.status && !statusOptions.includes(editTicket.status),
                severity: requiredInputs.severity && !["S1", "S2", "S3", "S4"].includes(editTicket.severity),
                client: false,
            }
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
                <main className="grid gap-x-6 gap-y-4 sm:grid-cols-1 md:grid-cols-2 border bg-backgroundContainer border-border shadow-lg px-4 py-8 rounded-xl">
                    <Input  
                        title="Título"
                        placeholder="TKT-001"
                        value={editTicket.title}
                        setValue={setTitle}
                        error={invalidInputs.title}
                        handleFocus={handleTitleFocus}
                        isRequired={requiredInputs.title}
                        disabled={disabledInputs.title} />
                    <AutocompleteInput
                        title="Responsable"
                        placeholder="Juan Perez"
                        value={editTicket.employeeId}
                        setValue={setEmployeeId}
                        error={invalidInputs.responsable}
                        errorText="El responsable debe ser valido"
                        handleFocus={handleEmployeeFocus}
                        isRequired={requiredInputs.responsable}
                        items={employees.map((employee) => {return { id: employee.legajo, name: employee.Nombre + employee.Apellido }})}
                        disabled={disabledInputs.responsable} />
                    <div className="col-span-full">
                        <TextArea
                            title="Descripción"
                            value={editTicket.description}
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
                            selected={editTicket.status}
                            disabled={disabledInputs.status}
                            onChange={setStatus} />
                        <ButtonRow
                            title="Severidad"
                            options={severityOptions}
                            selected={editTicket.severity}
                            setSelected={setSeverity}
                            isRequired={requiredInputs.severity}
                            error={invalidInputs.severity}
                            handleFocus={handleSeverityFocus}
                            disabled={disabledInputs.severity} />
                    </div>
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
