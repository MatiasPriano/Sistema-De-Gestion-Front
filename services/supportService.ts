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

export async function getTicketsByVersion(versionId: number): Promise<Ticket[]> {
    let response = await fetch(URL.url + `/v1/versions/${versionId}/tickets`)
    console.log(response)
    if (!response.ok) {
        console.log("Error fetching tickets by version")
        return []
    }
    return await response.json()
}

export async function getTicket(ticketId: number): Promise<Ticket | null> {
    let response = await fetch(URL.url + `/v1/tickets/${ticketId}`)
    if (!response.ok) {
        console.log(response)
        return null
    }
    return await response.json()
}
