import Resource from '@/types/resource';
import axios from 'axios';

export default async function getResources(): Promise<Resource[]> {
    const { data: resources } = await axios.get<Resource[]>("https://anypoint.mulesoft.com/mocking/api/v1/sources/exchange/assets/754f50e8-20d8-4223-bbdc-56d50131d0ae/recursos-psa/1.0.0/m/api/recursos")
    return resources
}
