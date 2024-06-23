export interface Client {
    id: number,
    "razon social": string,
    CUIT: string,
}

export const emptyClient: Client = {
    id: 0,
    "razon social": "",
    CUIT: ""
}
