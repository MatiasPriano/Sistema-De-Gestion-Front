import SimpleCell from "../cells/simpleCell";
import ActionsCell, { Action } from "../cells/actionsCell";
import { useRouter } from "next/router";
import React from "react";
import Project from "@/types/project";

export default function ProjectRow({ project }: { project: Project }) {
    const router = useRouter()
    const handleViewProjectClick = () => {
        // router.push(`/projects/${project.name}/${project.version}`)
    }
    const handleCreateTicketClick = () => {
        // router.push(`/projects/${project.name}/${project.version}/new`)
    }
    
    const actions: Action[] = [
        {
            icon: "view",
            onClick: handleViewProjectClick,
            title: "Ver projecto"
        },
        {
            icon: "create",
            onClick: handleCreateTicketClick,
            title: "Crear un ticket"
        }
    ]
    
    return (
        <tr key={project.name} >
            <td className="overflow-hidden">
                <SimpleCell name={project.name} />
            </td>
            <td className="overflow-hidden">
                <SimpleCell name={project.responsable} centered={true} />
            </td>
            <td className="overflow-hidden">
                <SimpleCell name={project.fechaFinalizacion} centered={true} />
            </td>
            <td className="overflow-hidden">
                <ActionsCell actions={actions}/>
            </td>
        </tr>
        
    );
}

