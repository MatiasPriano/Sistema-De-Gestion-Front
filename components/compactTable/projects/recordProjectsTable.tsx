import CompactTable from "../compactTable"
import React from "react"
import Project from "@/types/project"
import RecordProjectsRow from "./recordProjectsRow"

export default function RecordProjectsTable({ projects }: { projects: Project[] }) {
    const headers = ["Nombre", "Responsable", "Fecha de Finalización", "Acciones"]
    return (
        <CompactTable
            headerTitles={headers}
            rows={projects.map((project) => (
                <RecordProjectsRow project={project} />
            ))} />
    )
}