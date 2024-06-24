import { Project } from "./project";
import { Priority } from "./taskPriority";
import { State } from "./taskState";
import { TicketAssociation } from "./ticketAssociation";

export interface NewTask {
    id: number;
    title: string;
    assignedEmployee: number | null
    description: string
    project: Project | null
    state: State
    priority: Priority
    associatedTickets: TicketAssociation[]
    startDateTime: string
}

export const emptyNewTask: NewTask = {
    id: 0,
    title: "",
    assignedEmployee: null,
    description: "",
    project: null,
    state: "OPEN",
    priority: "LOW",
    associatedTickets: [],
    startDateTime: ""
}
