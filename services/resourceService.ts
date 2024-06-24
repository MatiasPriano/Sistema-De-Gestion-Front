import Resource from '@/types/resource';
import axios from 'axios';

export default async function getResources(): Promise<Resource[]> {
    const { data: resources } = await axios.get<Resource[]>("https://projects-backend-am35.onrender.com/resources")
    return resources
}
