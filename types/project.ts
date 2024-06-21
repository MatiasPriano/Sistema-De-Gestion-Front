export default interface Project {
    id: number
    name: string;
    fechaInicio: string;
    fechaFinalizacion: string;
    responsable: string;
    estado: State;
    descripcion: string;
}

export type State =
    "Iniciado" |
    "En desarrollo" |
    "En transición" |
    "Terminado"

export const emptyProject: Project = {
    id: 0,
    name: "",
    descripcion: "",
    responsable: "",
    estado: "Iniciado",
    fechaInicio: "",
    fechaFinalizacion: ""
}