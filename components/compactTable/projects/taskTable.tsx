import Task from "@/types/task"
import CompactTable from "../compactTable"
import TicketTaskRow from "./taskRow"

interface TaskTableProps {
    tasks: Task[],
    selectedTasks: number[]
    setSelectedTasks: (selectedTasks: number[]) => void
}

export default function TaskTable({ tasks, selectedTasks, setSelectedTasks }: TaskTableProps) {
    const headers = ["Selec.", "ID", "Título", "Responsable", "Prioridad", "Estado"]
    
    const handleRowSelection = (taskId: number, selected: boolean) => {
        let updatedSelectedTasks
        if (selected) {
            updatedSelectedTasks = [...selectedTasks, taskId]
        } else {
            updatedSelectedTasks = selectedTasks.filter(id => id !== taskId)
        }
        setSelectedTasks(updatedSelectedTasks);
    }
    
    return (
        <CompactTable
            headerTitles={headers}
            rows={tasks.map((task) => (
                <TicketTaskRow
                    key={task.id}
                    task={task}
                    selected={selectedTasks.includes(task.id)}
                    setSelected={handleRowSelection} />
            ))} />
    )
}