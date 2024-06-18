export default interface Ticket {
    id: number
    title: string
    description: string
    responsable: string
    status: Status
    severity: Severity
    client: string
    createdDateTime: string
}

export type Status =
    "Nuevo" |
    "En progreso" |
    "Esperando cliente" |
    "Esperando desarrollo" |
    "Resuelto a confirmar" |
    "Cerrado" |
    "Bloqueado"

export type Severity = "S1" | "S2" | "S3" | "S4"