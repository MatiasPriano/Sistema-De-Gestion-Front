
import SimpleCell from "../cells/simpleCell";
import ActionsCell, { Action } from "../cells/actionsCell";
import { useRouter } from "next/router";
import React from "react";
import Project from "@/types/project";
import { projectStateToPrintable } from "@/types/taskProjects";

export default function ProjectRow({ project }: { project: Project }) {
    const router = useRouter()

    const handleManageProjectClick = () => {
        router.push(`/gestionarProyectos/${project.id}`)
    }

    const handleViewTasksClick = () => {
        router.push(`/gestionarProyectos/${project.id}/tareas`)
    }
    const handleViewProjectClick = () => {
        router.push(`/gestionarProyectos/${project.id}/[projectView]`)
    }

    
    
    const actions: Action[] = [
        {
            icon: "edit",
            onClick: handleManageProjectClick,
            title: "Gestionar proyecto"
        },
        {
            icon: "list",
            onClick: handleViewTasksClick,
            title: "Ver tareas del proyecto"
        },
        {
            icon: "view",
            onClick: handleViewProjectClick,
            title: "Detalles del proyecto"
        }
    ]
    
    return (
        <tr key={project.name} >
            <td className="overflow-hidden">
                <SimpleCell name={project.name} />
            </td>
            <td className="overflow-hidden">
                <SimpleCell name={project.fechaInicio} centered={true} />
            </td>
            <td className="overflow-hidden">
                <SimpleCell name={project.fechaFinalizacion} centered={true} />
            </td>
            <td className="overflow-hidden">
                <SimpleCell name={project.responsable} centered={true} />
            </td>
            <td className="overflow-hidden">
                <SimpleCell name={projectStateToPrintable(project.estado)} centered={true} />
            </td>
            <td className="overflow-hidden">
                <ActionsCell actions={actions}/>
            </td>
        </tr>
        
    );
}

