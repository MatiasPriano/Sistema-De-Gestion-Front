export interface Project {
    id: number
    title: string
    description: string
    state: string
    assignedLeader: number
    startDate: string
    finishDate: string | null
}

export const emptyProject: Project = {
    id: 0,
    title: "",
    description: "",
    state: "",
    assignedLeader: 0,
    startDate: "",
    finishDate: null
}