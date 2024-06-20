export default interface Task {
    id: number;
    title: string;
    responsable?: string;
    description: string;
    project: string;
    status: string;
    priority: string;
    associatedTickets?: string[];
}

export const emptyTask: Task = {
    id: 0,
    title: "",
    responsable: "",
    description: "",
    project: "",
    status: "Abierta",
    priority: "Baja",
}