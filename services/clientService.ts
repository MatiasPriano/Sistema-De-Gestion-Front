import { Client } from '@/types/client';
import axios from 'axios';

export default async function getClients(): Promise<Client[]> {
    const { data: clients } = await axios.get<Client[]>("https://anypoint.mulesoft.com/mocking/api/v1/sources/exchange/assets/754f50e8-20d8-4223-bbdc-56d50131d0ae/clientes-psa/1.0.0/m/api/clientes")
    return clients
}
