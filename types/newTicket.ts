import { Severity } from "./severity"
import { Status } from "./status"

export default interface NewTicket {
    title: string
    description: string
    status: Status
    severity: Severity | null
    clientId: number | null
    employeeId: number | null
    versionId: number
    taskIds?: number[]
}

export function getEmptyNewTicket(versionId: number) : NewTicket {
    return {
        title: "",
        description: "",
        status: "NUEVO",
        severity: null,
        clientId: null,
        employeeId: null,
        versionId: versionId,
    }
}
