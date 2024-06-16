import Task from "@/types/task"
import CompactTable from "../compactTable"
import LinkTaskRow from "./linkTaskRow"

interface LinkTaskTableProps {
    tasks: Task[],
    selectedTasks: number[]
    setSelectedTasks: (selectedTasks: number[]) => void
}

export default function LinkTaskTable({ tasks, selectedTasks, setSelectedTasks }: LinkTaskTableProps) {
    const headers = ["Selec.", "ID", "Título", "Proyecto", "Responsable", "Prioridad", "Estado"]
    
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
                <LinkTaskRow
                    key={task.id}
                    task={task}
                    selected={selectedTasks.includes(task.id)}
                    setSelected={handleRowSelection} />
            ))} />
    )
}