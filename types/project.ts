export default interface Project {
    name: String;
    fechaInicio: String;
    fechaFinalizacion: String;
    responsable: String;
    estado: String;
}

export type Estado =
    "Iniciado" |
    "En desarrollo" |
    "En transición" |
    "Terminado"