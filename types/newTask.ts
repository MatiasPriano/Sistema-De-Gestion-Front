import { Project, emptyProject } from "./project";
import { Priority } from "./taskPriority";
import { State } from "./taskState";
import { TicketAssociation } from "./ticketAssociation";

export interface NewTask {
    id: number;
    title: string;
    assignedEmployee: number | null
    description: string
    project: Project
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
    project: emptyProject,
    state: "OPEN",
    priority: "LOW",
    associatedTickets: [],
    startDateTime: ""
}
