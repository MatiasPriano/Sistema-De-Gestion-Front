import axios from 'axios';

export interface Resource {
    legajo: number,
    Nombre: string,
    Apellido: string,
}

export default async function getResources() {
    const res = await axios.get("https://anypoint.mulesoft.com/mocking/api/v1/sources/exchange/assets/754f50e8-20d8-4223-bbdc-56d50131d0ae/recursos-psa/1.0.0/m/api/recursos")
    return res.data
}