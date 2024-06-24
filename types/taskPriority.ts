export type Priority = "LOW" | "MEDIUM" | "HIGH"

export function priorityToPrintable(priority: Priority): string {
    if (priority === "LOW") return "Baja"
    else if (priority === "MEDIUM") return "Media"
    else if (priority === "HIGH") return "Alta"
    else return "ERROR"
}