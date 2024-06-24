import Version from '@/types/version';
import { URL } from '@/types/url'
import Ticket from '@/types/ticket';
import Task from '@/types/task';
import { Client } from '@/types/client';
import Employee from '@/types/employee';
import NewTicket from '@/types/newTicket';
import EditTicket from '@/types/editTicket';
import { Project } from '@/types/project';
import { NewTask } from '@/types/newTask';

export async function getVersions(): Promise<Version[]> {
    let response = await fetch(URL.url + '/v1/versions')
    if (!response.ok) {
        console.log(response)
        return []
    }
    return await response.json()
}

export async function getVersion(versionId: number): Promise<Version> {
    let response = await fetch(URL.url + `/v2/versions/${versionId}`)
    if (!response.ok) {
        console.log("No se pudo obtener la versión")
        return { name: "", id: "-1", product: { id: "-1", name: "" } }
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

export async function createTicket(newTicket: NewTicket): Promise<number> {
    let response = await fetch(URL.url + '/v1/tickets', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTicket),
    })

    if (!response.ok) {
        console.log("No se pudo crear el ticket")
        return -1
    }
    let createdTicket: Ticket = await response.json()
    return createdTicket.id
}

export async function updateTicket(editTicket: EditTicket, ticketId: number): Promise<number> {
    let response = await fetch(URL.url + `/v1/tickets/${ticketId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(editTicket),
    })

    if (!response.ok) {
        console.log("No se pudo editar el ticket")
        return -1
    }
    let editedTicket: Ticket = await response.json()
    return editedTicket.id
}

export async function deleteTicket(ticketId: number): Promise<boolean> {
    let response = await fetch(URL.url + `/v1/tickets/${ticketId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    if (!response.ok) {
        console.log("No se pudo eliminar el ticket") 
        return false
    }
    return true
}

export async function getTaskIdsByTicket(ticketId: number): Promise<number[]> {
    let response = await fetch(URL.url + `/v1/tickets/${ticketId}/tasks`)
    if (!response.ok) {
        console.log(response)
        return []
    }
    return await response.json()
}

export async function getTasks(tasksId: number[]): Promise<Task[]> {
    if (tasksId.length === 0) {
        return []
    }
    let tasksParam = ""
    for (const taskId of tasksId) {
        if(tasksParam.length != 0)
            tasksParam = tasksParam + "," + taskId as unknown as string
        else
            tasksParam += taskId as unknown as string
    }
    let response = await fetch(`https://projects-backend-am35.onrender.com/tasks/?ids=${tasksParam}`)
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
        console.log("No se pudo conseguir los empleados")
        return []
    }
    return await response.json()
}

export async function getProjects(): Promise<Project[]> {
    let response = await fetch(`https://projects-backend-am35.onrender.com/projects`)
    if (!response.ok) {
        console.log("Error fetching tickets by version")
        return []
    }
    return await response.json()
}

export async function createTask(newTask: NewTask) {
    let response = await fetch(`https://projects-backend-am35.onrender.com/projects`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
    })
    if (!response.ok) {
        console.log("No se pudo crear la tarea")
        return false
    }
    return true
}

export async function associateTasks(ticketId: number, taskIds: number[]): Promise<boolean> {
    let response = await fetch(URL.url + `/v1/tickets/${ticketId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tasksToRelate: taskIds }),
    })
    if (!response.ok) {
        console.log("No se pudo asociar las tareas")
        return false
    }
    return true
}

export async function desassociateTasks(ticketId: number, taskIds: number[]): Promise<boolean> {
    let response = await fetch(URL.url + `/v1/tickets/${ticketId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tasksToUnrelate: taskIds }),
    })
    if (!response.ok) {
        console.log("No se pudo desasociar las tareas")
        return false
    }
    return true
}

export async function getAllTasks(): Promise<Task[]> {
    let response = await fetch(`https://projects-backend-am35.onrender.com/tasks`)
    if (!response.ok) {
        console.log("No se pudo obtener todas las tareas")
        return []
    }
    return await response.json()
}
