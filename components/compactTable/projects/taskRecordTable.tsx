import Task from "@/types/task"
import CompactTable from "../compactTable"
import TaskRecordRow from "./taskRecordRow"

interface TaskRecordTableProps {
    tasks: Task[],
}

export default function TaskRecordTable({ tasks }: TaskRecordTableProps) {
    const headers = ["ID", "Título", "Responsable", "Prioridad", "Estado"]
       
    return (
        <CompactTable
            headerTitles={headers}
            rows={tasks.map((task) => (
                <TaskRecordRow
                    key={task.id}
                    task={task}
                    />
            ))} />
    )
}