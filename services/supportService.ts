import Version from '@/types/version';
import { URL } from '@/types/url'
import Ticket from '@/types/ticket';

export async function getVersions(): Promise<Version[]> {
    let response = await fetch(URL.url + '/v1/versions')
    if (!response.ok) {
        console.log(response)
        return []
    }
    return await response.json()
}

export async function getTicketsByVersion(productId: string, versionId: string): Promise<Ticket[]> {
    let response = await fetch(URL.url + `/v1/versions/${productId}/${versionId}`)
    if (!response.ok) {
        console.log(response)
        return []
    }
    return await response.json()
}
