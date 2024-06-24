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
    priority: "Baja",
    maxTimeResolution: "",
    startDate: "",
    endDate: ""
}