import { Severity } from "./severity"
import { Status } from "./status"
import Ticket from "./ticket"

export default interface EditTicket {
    title: string
    description: string
    status: Status
    severity: Severity
    clientId: number | null
    employeeId: number | null
    tasksToRelate?: number[]
    tasksToUnrelate?: number[]
}

export function getEditTicketFromTicket(ticket: Ticket) : EditTicket {
    let employeeId = null
    if (ticket.employee) {
        employeeId = ticket.employee.legajo
    }
    return {
        title: ticket.title,
        description: ticket.description,
        status: ticket.status,
        severity: ticket.severity,
        clientId: ticket.client.id,
        employeeId,
    }
}

export const emptyEditTicket: EditTicket = {
    title: "",
    description: "",
    status: "NUEVO",
    severity: "S1",
    clientId: -1,
    employeeId: -1,
}
