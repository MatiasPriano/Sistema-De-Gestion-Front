import { Client, emptyClient } from "./client"
import Employee, { emptyEmployee } from "./employee"

export default interface Ticket {
    id: number
    title: string
    description: string
    status: Status
    severity: Severity
    client: Client
    employee: Employee
    createdDateTime: string
    version: string
    maxResponseTime: string
    taskIds: number[]
}

export type Status =
    "NUEVO" |
    "EN_PROGRESO" |
    "ESPERANDO_CLIENTE" |
    "ESPERANDO_DESARROLLO" |
    "RESUELTO_A_CONFIRMAR" |
    "CERRADO" |
    "BLOQUEADO"

export type Severity = "S1" | "S2" | "S3" | "S4"

export function statusToPrintable(status: Status): string {
    return status.replaceAll("_", " ")
}

export const emptyTicket: Ticket = {
    id: 0,
    title: "",
    description: "",
    status: "NUEVO",
    severity: "S1",
    createdDateTime: "",
    client: emptyClient,
    employee: emptyEmployee,
    version: "",
    maxResponseTime: "",
    taskIds: []
}