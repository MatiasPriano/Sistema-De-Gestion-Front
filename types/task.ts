export default interface Task {
    id: number;
    title: string;
    responsable?: string;
    project: string;
    status: string;
    associatedTickets?: string[];
}
