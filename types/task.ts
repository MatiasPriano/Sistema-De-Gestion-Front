import { Priority } from "./taskPriority";
import { State } from "./taskState";
import { TicketAssociation } from "./ticketAssociation";

export default interface Task {
    id: number;
    title: string;
    assignedEmployee?: string
    description: string
    project: string
    state: State
    priority: Priority
    associatedTickets: TicketAssociation[]
    daysToComplete: number
    finishDate: string
    firstTicketDate: string
    firstTicketId: number
    startDate: string
}

export const emptyTask: Task = {
    id: 0,
    title: "",
    assignedEmployee: "",
    description: "",
    project: "",
    state: "OPEN",
    priority: "LOW",
    associatedTickets: [],
    daysToComplete: 0,
    finishDate: "",
    firstTicketDate: "",
    firstTicketId: 0,
    startDate: ""
}