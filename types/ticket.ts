import { Client, emptyClient } from "./client"
import Employee, { emptyEmployee } from "./employee"
import { Severity } from "./severity"
import { Status } from "./status"

export default interface Ticket {
    id: number
    title: string
    description: string
    status: Status
    severity: Severity
    client: Client
    employee: Employee | null
    createdDateTime: string
    version: string
    maxResponseTime: string
    taskIds: number[]
}
