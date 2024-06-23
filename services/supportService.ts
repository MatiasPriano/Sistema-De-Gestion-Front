import Version from '@/types/version';
import { URL } from '@/types/url'
import Ticket from '@/types/ticket';
import Task from '@/types/task';
import { Client } from '@/types/client';
import Employee from '@/types/employee';

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

export async function getTicket(ticketId: string): Promise<Ticket | null> {
    let response = await fetch(URL.url + `/v1/tickets/${ticketId}`)
    if (!response.ok) {
        console.log(response)
        return null
    }
    return await response.json()
}

export async function createTicket(ticket: Ticket): Promise<number> {
    let response = await fetch(URL.url + '/v1/tickets', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(ticket),
    })

    if (!response.ok) {
        console.log(response)
        return -1
    }

    return await response.json()
}

export async function updateTicket(ticket: Ticket): Promise<number> {
    let response = await fetch(URL.url + `/v1/tickets/${ticket.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(ticket),
    })

    if (!response.ok) {
        console.log(response)
        return -1
    }

    return await response.json()
}

export async function deleteTicket(ticketId: string): Promise<string> {
    let response = await fetch(URL.url + `/v1/tickets/${ticketId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    if (!response.ok) {
        console.log(response)
        return ''
    }

    return await response.json()
}

export async function getTasksByTicket(ticketId: string): Promise<Task[]> {
    let response = await fetch(URL.url + `/v1/tickets/${ticketId}/tasks`)
    if (!response.ok) {
        console.log(response)
        return []
    }
    return await response.json()
}

export async function getStatisticsByTicket(ticketId: string): Promise<string> {
// export async function getStatisticsByTicket(ticketId: string): Promise<TicketStatistics> {
    let response = await fetch(URL.url + `/v1/tickets/${ticketId}/statistics`)
    if (!response.ok) {
        console.log(response)
        return ''
    }
    return await response.json()
}

export async function getMaxResponseTimeByTicket(ticketId: string): Promise<string> {
    let response = await fetch(URL.url + `/v1/tickets/${ticketId}/max-response-time`)
    if (!response.ok) {
        console.log(response)
        return ''
    }
    return await response.json()
}

export async function getClients(): Promise<Client[]> {
    let response = await fetch(URL.url + `/v1/clients`)
    if (!response.ok) {
        console.log(response)
        return []
    }
    return await response.json()
}

export async function getEmployees(): Promise<Employee[]> {
    let response = await fetch(URL.url + `/v1/employees`)
    if (!response.ok) {
        console.log(response)
        return []
    }
    return await response.json()
}
