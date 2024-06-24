import ResourceCell from "../cells/resourceCell";
import SimpleCell from "../cells/simpleCell";
import ColouredCell, { ColouredCellColours } from "../cells/colouredCell";
import ActionsCell, { Action } from "../cells/actionsCell";
import { useRouter } from "next/router";
import React from "react";
import Task from "@/types/task";

export default function TaskRow({ task, projectId }: {task: Task, projectId: string }) {
    const router = useRouter()
    const handleViewTaskClick = () => {
        router.push(`/projects/gestionarProyectos/${projectId}/tareas/${task.id}`);
    }
    const handleViewTicketsClick = () => {
        router.push(`/projects/gestionarProyectos/${projectId}/tareas/${task.id}/tickets`);
    }
    const handleManageProjectClick = () => {
        router.push(`/projects/gestionarProyectos/${projectId}/tareas/${task.id}/edit`);
    }
    

    const actions: Action[] = [
        {
            icon: "view",
            onClick: handleViewTaskClick,
            title: "Ver tarea"
        },
        {
            icon: "list",
            onClick: handleViewTicketsClick,
            title: "Ver tickets asociados"
        },
        {
            icon: "edit",
            onClick: handleManageProjectClick,
            title: "Editar tarea"
        }
    ]

    return (
        <tr key={task.id} >
            <td className="w-20 overflow-hidden">
                <SimpleCell name={"#" + task.id}/>
            </td>
            <td className="w-100 overflow-hidden">
                <SimpleCell name={task.title} />
            </td>
            <td className="w-60 overflow-hidden">
                <ResourceCell name={task.responsable}/>
            </td>
            <td className="w-30 overflow-hidden">
                <SimpleCell name={task.priority} centered={true} />
            </td>
            <td className="w-30 overflow-hidden">
                <ColouredCell name={task.status} colour={statusColourMap[task.status]} />
            </td>
            <td className="overflow-hidden">
                <ActionsCell actions={actions}/>
            </td>
        </tr>  
    );
}

interface StatusColourMap {
    [key: string]: ColouredCellColours;
}

const statusColourMap : StatusColourMap = {
    "Abierta": "green",
    "Cerrada" : "red"
}


