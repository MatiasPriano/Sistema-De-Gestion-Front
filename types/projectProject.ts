export default interface Project {
    projectview: any;
    id: number
    name: string;
    fechaInicio: string;
    fechaFinalizacion: string;
    responsable: string;
    estado: State;
    descripcion: string;
}

export type State =
    "OPEN" |
    "CLOSED" |
    "PROGRESS" |
    "BLOCKED" |
    "FINISHED"

export const emptyProject: Project = {
    id: 0,
    name: "",
    descripcion: "",
    responsable: "",
    estado: "OPEN",
    fechaInicio: "",
    fechaFinalizacion: "",
    projectview: undefined
}