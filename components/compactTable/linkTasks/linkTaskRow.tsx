import Task from "@/types/task";
import { useState } from "react";
import SimpleCell from "../cells/simpleCell";
import ResourceCell from "../cells/resourceCell";
import ColouredCell, { ColouredCellColours } from "../cells/colouredCell";

interface LinkTaskRowProps {
    task: Task
    selected: boolean
    setSelected: (taskId: number, selected: boolean) => void
}

export default function LinkTaskRow({ task, selected, setSelected }: LinkTaskRowProps) {
    const toggleCheckbox = () => {
        setSelected(task.id, !selected)
    }

    return (
        <tr key={task.id} className={getCheckBoxClass(selected)} onClick={toggleCheckbox} >
            <td className="w-10 overflow-hidden">
                <div className="text-title rounded-md mx-2 flex items-center">
                    <input  type="checkbox"
                            className="form-checkbox h-4 w-4 text-primary"
                            onChange={toggleCheckbox}
                            checked={selected} />
                </div>
            </td>
            <td className="w-20 overflow-hidden">
                <SimpleCell name={"#" + task.id} />
            </td>
            <td className="w-150 overflow-hidden">
                <SimpleCell name={task.title} />
            </td>
            <td className="w-60 overflow-hidden">
                <SimpleCell name={task.project} />
            </td>
            <td className="w-40 overflow-hidden">
                <ResourceCell name={task.responsable} />
            </td>
            <td className="w-20 overflow-hidden">
                <SimpleCell name={task.priority} centered={true} />
            </td>
            <td className="w-20 overflow-hidden">
                <ColouredCell name={task.status} colour={statusColourMap[task.status]} />
            </td>
        </tr>
    );
}

function getCheckBoxClass(isChecked: boolean) {
    let className = 'transition-all duration-200 text-title'

    if (isChecked) {
        className += ' bg-selected'
    }
    return className
}

interface StatusColourMap {
    [key: string]: ColouredCellColours;
}

const statusColourMap : StatusColourMap = {
    "Abierta": "green",
    "Cerrada" : "red"
}