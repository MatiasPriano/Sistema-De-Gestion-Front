import Task from "@/types/task";
import ResourceCell from "../cells/resourceCell";
import SimpleCell from "../cells/simpleCell";
import ColouredCell, { ColouredCellColours } from "../cells/colouredCell";
import React from "react";

interface TaskRecordRowProps {
    task: Task
}

export default function TaskRecordRow({ task }: TaskRecordRowProps) {
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
                <SimpleCell name={task.status} centered={true} />
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