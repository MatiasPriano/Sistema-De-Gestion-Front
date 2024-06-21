
import ProjectRow from "./projectsRow"
import CompactTable from "../compactTable"
import React from "react"
import Project from "@/types/project"

export default function ProjectTable({ projects }: { projects: Project[] }) {
    const headers = ["Nombre", "Fecha de Inicio", "Fecha de Finalización", "Responsable", "Estado", "Acciones"]
    return (
        <CompactTable
            headerTitles={headers}
            rows={projects.map((project) => (
                <ProjectRow project={project} />
            ))} />
    )
}