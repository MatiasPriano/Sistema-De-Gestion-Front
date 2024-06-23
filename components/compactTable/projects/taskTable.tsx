import Task from "@/types/task"
import CompactTable from "../compactTable"
import TaskRow from "./taskRow"
import React from "react"

export default function TaskTable({ projectId, tasks }: {projectId: string, tasks: Task[]}) {
    const headers = ["ID", "Título", "Responsable", "Prioridad", "Estado", "Acciones"]
      
    return (
        <CompactTable
            headerTitles={headers}
            rows={tasks.map((task) => (
                <TaskRow
                    task={task}
                    projectId={projectId} product={undefined} />
            ))} />
    )
}