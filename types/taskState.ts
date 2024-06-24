export type State = "OPEN" | "CLOSED" | "BLOCKED" | "FINISHED" | "PROGRESS"

export function stateToPrintable(state: State): string {
    if (state === "OPEN") return "Abierta"
    else if (state === "CLOSED") return "Cerrada"
    else if (state === "BLOCKED") return "Bloqueada"
    else if (state === "FINISHED") return "Terminada"
    else return "En progreso"
}

export function printableToState(printable: string): State {
    if (printable === "Abierta") return "OPEN"
    else if (printable === "Cerrada") return "CLOSED"
    else if (printable === "Bloqueada") return "BLOCKED"
    else if (printable === "Terminada") return "FINISHED"
    else return "PROGRESS"
}