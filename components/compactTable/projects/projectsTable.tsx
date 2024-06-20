
import ProjectRow from "./projectsRow"
import CompactTable from "../compactTable"
import React from "react"

interface Project {
    name: string
    version: string
}

export default function ProjectTable({ projects }: { projects: Project[] }) {
    const headers = ["Nombre","Fecha de Finalización", "Responsable", "Ver tareas"]
    return (
        <CompactTable
            headerTitles={headers}
            rows={projects.map((project) => (
                <ProjectRow project={project} />
            ))} />
    )
}