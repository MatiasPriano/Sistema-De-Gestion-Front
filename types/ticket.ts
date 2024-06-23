// {
//     "id": 1,
//     "title": "Test",
//     "description": "string",
//     "status": "CERRADO",
//     "severity": "S1",
//     "client": {
//       "id": 3,
//       "CUIT": "20-12345678-3",
//       "razon social": "Macro"
//     },
//     "employee": {
//       "legajo": 3,
//       "Nombre": "Patricia",
//       "Apellido": "Gaona"
//     },
//     "version": "1.1",
//     "maxResponseTime": "PT168H",
//     "taskIds": []
//   },

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
    "Nuevo" |
    "En progreso" |
    "Esperando cliente" |
    "Esperando desarrollo" |
    "Resuelto a confirmar" |
    "Cerrado" |
    "Bloqueado"

export type Severity = "S1" | "S2" | "S3" | "S4"

export const emptyTicket: Ticket = {
    id: 0,
    title: "",
    description: "",
    status: "Nuevo",
    severity: "S1",
    createdDateTime: "",
    client: emptyClient,
    employee: emptyEmployee,
    version: "",
    maxResponseTime: "",
    taskIds: []
}