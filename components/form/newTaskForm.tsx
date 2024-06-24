import Task from "@/types/task";
import Input from "../input/input";
import AutocompleteInput from "../input/autocomplete";
import TextArea from "../input/textArea";
import { ChangeEvent, useState } from "react";
import ButtonRow, { ButtonOption } from "../button/buttonRow";
import TextButton from "../button/textButton";
import { toast } from "react-hot-toast";
import { NewTask } from "@/types/newTask";
import Employee from "@/types/employee";
import { Project } from "@/types/project";
import { Priority } from "@/types/taskPriority";

const priorityOptions: ButtonOption[] = [
    { title: "LOW", colour: "green" }, 
    { title: "MEDIUM", colour: "orange" }, 
    { title: "HIGH", colour: "red" }, 
]

export interface TaskInputs {
    [key: string]: boolean
    title: boolean;
    responsable: boolean;
    description: boolean;
    project: boolean;
    state: boolean;
    priority: boolean;
}

interface TaskFormProps {
    newTask: NewTask
    setNewTask: (newTask: NewTask) => void
    disabledInputs: TaskInputs
    requiredInputs: TaskInputs
    submitButtonName: string
    onSubmit: () => void
    onCancel: () => void
    employees: Employee[]
    projects: Project[]
}

export default function NewTaskForm(
    {
        newTask,
        setNewTask,
        disabledInputs,
        requiredInputs,
        submitButtonName,
        onSubmit,
        onCancel,
        employees,
        projects
    }: TaskFormProps) {

    const [invalidInputs, setInvalidInputs] = useState<TaskInputs>({
        title: false,
        responsable: false,
        description: false,
        project: false,
        state: false,
        priority: false,
    })

    const [projectId, setProjectId] = useState<number|null>(null)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        
        let projectsWithSameId = projects.filter((project) => project.id === projectId)
        let project: Project = projectsWithSameId[0]
        console.log("Proyecto: ", project)
        setNewTask({...newTask, project: project })

        const finalInvalidInputs: TaskInputs = {
            title: requiredInputs.title && newTask.title.trim() === "",
            responsable: requiredInputs.responsable && (newTask.assignedEmployee === null || !employees.map((employee) => employee.legajo).includes(newTask.assignedEmployee)),
            description: requiredInputs.description && newTask.description.trim() === "",
            project: requiredInputs.project && (projectId === null || !projects.map((project) => project.id).includes(projectId)),
            state: requiredInputs.state && !["OPEN", "CLOSED", "BLOCKED"].includes(newTask.state),
            priority: requiredInputs.priority && !["LOW", "MEDIUM", "HIGH"].includes(newTask.priority)
        }
        if (!finalInvalidInputs.title &&
            !finalInvalidInputs.responsable &&
            !finalInvalidInputs.description &&
            !finalInvalidInputs.project &&
            !finalInvalidInputs.state &&
            !finalInvalidInputs.priority) {
                onSubmit()
        } else {
            setInvalidInputs(finalInvalidInputs)
            toast.error("Existen campos incompletos")
        }
    }

    const setTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTask({ ...newTask, title: event.target.value })
    }
    const handleTitleFocus = () => {
        setInvalidInputs({...invalidInputs, title: false})
    }

    const setEmployee = (responsable: number | null) => {
        setNewTask({ ...newTask, assignedEmployee: responsable })
    }
    const handleResponsableFocus = () => {
        setInvalidInputs({...invalidInputs, responsable: false})
    }
    const setDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setNewTask({ ...newTask, description: event.target.value })
    }
    const handleDescriptionFocus = () => {
        setInvalidInputs({...invalidInputs, description: false})
    }

    const handleProjectFocus = () => {
        setInvalidInputs({ ...invalidInputs, project: false })
    }

    const setPriority = (priority: Priority) => {
        setNewTask({ ...newTask, priority: priority })
    }
    const handlePriorityFocus = () => {
        setInvalidInputs({ ...invalidInputs, priority: false })
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <main className="grid gap-x-6 gap-y-4 sm:grid-cols-1 md:grid-cols-2 shadow-lg border border-border bg-backgroundContainer px-4 py-8 rounded-xl">
                <Input  
                    title="Título"
                    placeholder="Agregar breadcrumb"
                    value={newTask.title}
                    setValue={setTitle}
                    error={invalidInputs.title}
                    handleFocus={handleTitleFocus}
                    isRequired={requiredInputs.title}
                    disabled={disabledInputs.title} />
                <AutocompleteInput
                    title="Responsable"
                    placeholder="Juan Perez"
                    value={newTask.assignedEmployee}
                    setValue={setEmployee}
                    error={invalidInputs.responsable}
                    errorText="El responsable debe ser valido"
                    handleFocus={handleResponsableFocus}
                    isRequired={requiredInputs.responsable}
                    items={employees.map((employee) => {return { id: employee.legajo, name: employee.Nombre + employee.Apellido }})}
                    disabled={disabledInputs.responsable} />
                <div className="col-span-full">
                    <TextArea
                        title="Descripción"
                        value={newTask.description}
                        setValue={setDescription}
                        placeholder="Agregar breadcrumbs a todas las pantallas, indicando desde el inicio el recorrido hasta llegar a la pantalla correspondiente."
                        isRequired={requiredInputs.description}
                        error={invalidInputs.description}
                        handleFocus={handleDescriptionFocus}
                        disabled={disabledInputs.description} />
                </div>
                <AutocompleteInput
                    title='Proyecto'
                    placeholder='UPP Sistema - 2024'
                    value={projectId}
                    setValue={setProjectId}
                    isRequired={requiredInputs.project}
                    error={invalidInputs.project}
                    errorText="El proyecto debe ser valido"
                    handleFocus={handleProjectFocus}
                    items={projects.map((project) => {return { id: project.id, name: project.title }})}
                    disabled={disabledInputs.project} />
                <ButtonRow
                    title="Prioridad"
                    options={priorityOptions}
                    selected={newTask.priority}
                    setSelected={(selected :string | null) => setPriority(selected as Priority)}
                    isRequired={requiredInputs.priority}
                    error={invalidInputs.priority}
                    handleFocus={handlePriorityFocus} />
                <div className='flex col-span-full pt-2'>
                    <div className="flex items-center justify-end gap-x-6 px-4 w-full">
                        <TextButton
                            name="Cancelar"
                            style="transparent"
                            onClick={onCancel} />
                        <TextButton
                            name={submitButtonName}
                            type="submit"
                            style="primary" />
                    </div>
                </div>
            </main>
        </form>
    )
}