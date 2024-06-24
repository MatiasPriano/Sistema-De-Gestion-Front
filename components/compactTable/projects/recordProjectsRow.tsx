import SimpleCell from "../cells/simpleCell";
import ActionsCell, { Action } from "../cells/actionsCell";
import { useRouter } from "next/router";
import React from "react";
import ArchivedProject from "@/types/archivedProject";

export default function RecordProjectsRow({ project }: { project: ArchivedProject }) {
    const router = useRouter()

    const handleViewTasksClick = () => {
        router.push(`/projects/historialProyectos/${project.id}/tareas`)
    }
    
    const actions: Action[] = [
        {
            icon: "view",
            onClick: handleViewTasksClick,
            title: "Ver tareas"
        },
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

