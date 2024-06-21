import Input from "../input/input"
import { useState } from "react"
import AutocompleteInput from "../input/autocomplete"
import TextArea from "../input/textArea"
import ComboBox from "../input/comboBox"
import ButtonRow, { ButtonOption } from "../button/buttonRow"
import TextButton from "../button/textButton"
import { toast } from 'react-hot-toast';
import Project, { State } from "@/types/project"

const stateOptions: State[] =
    [
        "Iniciado",
        "En desarrollo",
        "En transición",
        "Terminado"
    ]

export interface ProjectInputs {
    [key: string]: boolean
    name: boolean
    description: boolean
    responsable: boolean
    state: boolean
    endDateTime: boolean
}

export interface ProjectFormProps {
    project: Project
    setProject: (project: Project) => void
    requiredInputs: ProjectInputs
    disabledInputs: ProjectInputs
    resources: string[]
    onSubmit: () => void
    onCancel: () => void
    submitButtonName: string
}

export default function ProjectForm (
    {
        project,
        setProject,
        onSubmit,
        onCancel,
        resources,
        requiredInputs,
        disabledInputs,
        submitButtonName
    } : ProjectFormProps) {
        const [invalidInputs, setInvalidInputs] = useState<ProjectInputs>(
            {
                name: false,
                description: false,
                responsable: false,
                state: false,
                endDateTime: false,
            }
        )

        const setName = (event: React.ChangeEvent<HTMLInputElement>) => {
            setProject({ ...project, name: event.target.value })
        }

        const handleNameFocus = () => {
            setInvalidInputs({...invalidInputs, name: false})
        }

        const setResponsable = (responsable: string) => {
            setProject({ ...project, responsable: responsable })
        }

        const handleResponsableFocus = () => {
            setInvalidInputs({ ...invalidInputs, responsable: false })
        }

        const setDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            setProject({ ...project, descripcion: event.target.value })
        }

        const handleDescriptionFocus = () => {
            setInvalidInputs({ ...invalidInputs, description: false })
        }

        const setStatus = (state: string) => {
            setProject({ ...project, estado: state as State })
        }

        const setClient = (endDateTime: string) => {
            setProject({ ...project, fechaFinalizacion: endDateTime })
        }

        const handleEndDateTimeFocus = () => {
            setInvalidInputs({ ...invalidInputs, endDateTime: false })
        }

        const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault()

            const finalInvalidInputs: ProjectInputs = {
                name: requiredInputs.name && project.name.trim() === "",
                responsable: !disabledInputs.responsable && requiredInputs.responsable && !resources.includes(project.responsable),
                description: requiredInputs.description && project.descripcion.trim() === "",
                state: requiredInputs.status && !stateOptions.includes(project.estado),
                endDateTime: !disabledInputs.endDateTime && requiredInputs.endDateTime
            }

            console.log(project)
            console.log(invalidInputs)
            console.log()

            if (!finalInvalidInputs.name &&
                !finalInvalidInputs.responsable &&
                !finalInvalidInputs.description &&
                !finalInvalidInputs.state &&
                !finalInvalidInputs.endDateTime) {
                    onSubmit()

            } else {
                setInvalidInputs(finalInvalidInputs)
                toast.error("Existen campos incompletos")
            }
        }

        return (
            <form onSubmit={handleSubmit} className="space-y-4">
                <main className="grid gap-x-6 gap-y-4 sm:grid-cols-1 md:grid-cols-2 border bg-backgroundContainer border-border shadow-lg px-4 py-8 rounded-xl">
                <Input  
                        title="Nombre"
                        placeholder=""
                        value=""  //esto debe cambiarse por {project.name} pero me tira error
                        setValue={setName}
                        error={invalidInputs.name}
                        handleFocus={handleNameFocus}
                        isRequired={requiredInputs.name}
                        disabled={disabledInputs.name} />
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
