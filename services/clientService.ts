import axios from 'axios';

export interface Client {
    id: number,
    "razon social": string,
    CUIT: string,
}

export default async function getClients() {
    const res = await axios.get("https://anypoint.mulesoft.com/mocking/api/v1/sources/exchange/assets/754f50e8-20d8-4223-bbdc-56d50131d0ae/clientes-psa/1.0.0/m/api/clientes")
    return res.data
}