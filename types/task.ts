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
