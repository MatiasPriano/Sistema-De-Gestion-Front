import Task from "@/types/task";
import Input from "../input/input";
import AutocompleteInput from "../input/autocomplete";
import TextArea from "../input/textArea";
import { ChangeEvent, useState } from "react";
import ButtonRow, { ButtonOption } from "../button/buttonRow";
import TextButton from "../button/textButton";
import { toast } from "react-hot-toast";

const priorityOptions: ButtonOption[] = [
    { title: "Baja", colour: "green" }, 
    { title: "Media", colour: "orange" }, 
    { title: "Alta", colour: "red" }, 
]

export interface TaskInputs {
    [key: string]: boolean
    title: boolean;
    responsable: boolean;
    description: boolean;
    project: boolean;
    status: boolean;
    priority: boolean;
}

interface TaskFormProps {
    task: Task
    setTask: (task: Task) => void
    disabledInputs: TaskInputs
    requiredInputs: TaskInputs
    submitButtonName: string
    onSubmit: () => void
    onCancel: () => void
    resources: string[]
    projects: string[]
}

export default function TaskForm(
    {
        task,
        setTask,
        disabledInputs,
        requiredInputs,
        submitButtonName,
        onSubmit,
        onCancel,
        resources,
        projects
    }: TaskFormProps) {

    const [invalidInputs, setInvalidInputs] = useState<TaskInputs>({
        title: false,
        responsable: false,
        description: false,
        project: false,
        status: false,
        priority: false,
    })

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const finalInvalidInputs: TaskInputs = {
            title: requiredInputs.title && task.title.trim() === "",
            responsable: requiredInputs.responsable && !resources.includes(task.responsable || ""),
            description: requiredInputs.description && task.description.trim() === "",
            project: requiredInputs.project && !projects.includes(task.project),
            status: requiredInputs.status && !["Abierta", "Cerrada"].includes(task.status),
            priority: requiredInputs.priority && !["Baja", "Media", "Alta"].includes(task.priority)
        }
        console.log(["Baja", "Media", "Alta"].includes(task.priority))
        if (!finalInvalidInputs.title &&
            !finalInvalidInputs.responsable &&
            !finalInvalidInputs.description &&
            !finalInvalidInputs.project &&
            !finalInvalidInputs.status &&
            !finalInvalidInputs.priority) {
                onSubmit()
        } else {
            setInvalidInputs(finalInvalidInputs)
            toast.error("Existen campos incompletos")
        }
    }

    const setTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTask({ ...task, title: event.target.value })
    }
    const handleTitleFocus = () => {
        setInvalidInputs({...invalidInputs, title: false})
    }

    const setResponsable = (responsable: string) => {
        setTask({ ...task, responsable: responsable })
    }
    const handleResponsableFocus = () => {
        setInvalidInputs({...invalidInputs, responsable: false})
    }

    const setDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setTask({ ...task, description: event.target.value })
    }
    const handleDescriptionFocus = () => {
        setInvalidInputs({...invalidInputs, description: false})
    }

    const setProject = (project: string) => {
        setTask({ ...task, project: project })
    }
    const handleProjectFocus = () => {
        setInvalidInputs({ ...invalidInputs, project: false })
    }

    const setPriority = (priority: string | null) => {
        setTask({ ...task, priority: priority || "" })
    }
    const handlePriorityFocus = () => {
        setInvalidInputs({ ...invalidInputs, priority: false })
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <main className="grid gap-x-6 gap-y-4 sm:grid-cols-1 md:grid-cols-2 border bg-darkTitle border-primary px-4 py-8 rounded-xl">
                <Input  
                    title="Título"
                    placeholder="Agregar breadcrumb"
                    value={task.title}
                    setValue={setTitle}
                    error={invalidInputs.title}
                    handleFocus={handleTitleFocus}
                    isRequired={requiredInputs.title}
                    disabled={disabledInputs.title} />
                <AutocompleteInput
                    title="Responsable"
                    placeholder="Juan Perez"
                    value={task.responsable || ""}
                    setValue={setResponsable}
                    error={invalidInputs.responsable}
                    errorText="El responsable debe ser valido"
                    handleFocus={handleResponsableFocus}
                    isRequired={requiredInputs.responsable}
                    items={resources}
                    disabled={disabledInputs.responsable} />
                <div className="col-span-full">
                    <TextArea
                        title="Descripción"
                        value={task.description}
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
                        value={task.project}
                        setValue={setProject}
                        isRequired={requiredInputs.project}
                        error={invalidInputs.project}
                        errorText="El proyecto debe ser valido"
                        handleFocus={handleProjectFocus}
                        items={[]}
                        disabled={disabledInputs.project} />
                <ButtonRow
                    title="Prioridad"
                    options={priorityOptions}
                    selected={task.priority}
                    setSelected={setPriority}
                    isRequired={requiredInputs.priority}
                    error={invalidInputs.priority}
                    handleFocus={handlePriorityFocus} />
                <div className='flex col-span-full pt-2'>
                    <div className="flex items-center justify-end gap-x-6 px-4 w-full">
                        <TextButton
                            name="Cancelar"
                            style="subtle"
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