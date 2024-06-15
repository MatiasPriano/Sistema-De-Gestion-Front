import Task from "@/types/task"
import CompactTable from "../compactTable"
import LinkTaskRow from "./linkTaskRow"

export default function LinkTaskTable({ tasks }: { tasks: Task[] }) {
    const headers = ["Selec.", "ID", "Título", "Proyecto", "Responsable", "Estado"]
    return (
        <CompactTable
            headerTitles={headers}
            rows={tasks.map((task) => (
                <LinkTaskRow task={task} />
            ))} />
    )
}