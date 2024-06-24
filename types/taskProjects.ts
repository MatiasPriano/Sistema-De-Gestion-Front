export default interface TaskProject {
    id: number;
    title: string;
    responsable?: string;
    description: string;
    project: string;
    status: State;
    priority: string;
    associatedTickets?: string[];
    maxTimeResolution: string;
    startDate: string;
    endDate: string;
}

export type State =
    "OPEN" |
    "CLOSED" |
    "BLOCKED" |
    "PROGRESS" |
    "FINISHED"

export const emptyTask: TaskProject = {
    id: 0,
    title: "",
    responsable: "",
    description: "",
    project: "",
    status: "OPEN",
    priority: "LOW",
    maxTimeResolution: "",
    startDate: "",
    endDate: ""
}

export function projectStateToPrintable(status: State): string {
    if (status === "OPEN") return "Abierto"
    else if (status === "CLOSED") return "Cerrado"
    else if (status === "BLOCKED") return "Bloqueado"
    else if (status === "PROGRESS") return "En progreso"
    else if (status === "FINISHED") return "Terminado"
    else return "ERROR"
}