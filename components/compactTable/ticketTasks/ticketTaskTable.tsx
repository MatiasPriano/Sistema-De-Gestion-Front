import Task from "@/types/task"
import CompactTable from "../compactTable"
import TicketTaskRow from "./ticketTaskRow"

export default function TicketTaskTable({ tasks }: { tasks: Task[] }) {
    const headers = ["ID", "Título", "Proyecto", "Responsable", "Prioridad", "Estado"]
    return (
        <CompactTable
            headerTitles={headers}
            rows={tasks.map((task) => (
                <TicketTaskRow task={task} />
            ))} />
    )
}