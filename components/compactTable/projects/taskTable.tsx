import Task from "@/types/task"
import CompactTable from "../compactTable"
import TicketTaskRow from "./taskRow"
import TaskRow from "./taskRow"

interface TaskTableProps {
    projectId: string,
    tasks: Task[],
    selectedTasks: number[]
    setSelectedTasks: (selectedTasks: number[]) => void
}

export default function TaskTable({ projectId, tasks, selectedTasks, setSelectedTasks }: TaskTableProps) {
    const headers = ["ID", "Título", "Responsable", "Prioridad", "Estado", "Acciones"]
    
    // const handleRowSelection = (taskId: number, selected: boolean) => {
    //     let updatedSelectedTasks
    //     if (selected) {
    //         updatedSelectedTasks = [...selectedTasks, taskId]
    //     } else {
    //         updatedSelectedTasks = selectedTasks.filter(id => id !== taskId)
    //     }
    //     setSelectedTasks(updatedSelectedTasks);
    // }
    
    return (
        <CompactTable
            headerTitles={headers}
            rows={tasks.map((task) => (
                <TaskRow
                    key={task.id}
                    task={task} 
                    projectId={projectId} />
            ))} />
    )
}