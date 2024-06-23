export type Status =
    "NUEVO" |
    "EN_PROGRESO" |
    "ESPERANDO_CLIENTE" |
    "ESPERANDO_DESARROLLO" |
    "RESUELTO_A_CONFIRMAR" |
    "CERRADO" |
    "BLOQUEADO"

export function statusToPrintable(status: Status): string {
    return status.replaceAll("_", " ")
}