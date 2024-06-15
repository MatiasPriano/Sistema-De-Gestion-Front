import Task from "@/types/task";
import ResourceCell from "../cells/resourceCell";
import SimpleCell from "../cells/simpleCell";
import ColouredCell, { ColouredCellColours } from "../cells/colouredCell";

export default function TicketTaskRow({ task }: { task: Task }) {
    return (
        <tr key={task.id} >
            <td className="w-20 overflow-hidden">
                <SimpleCell name={"#" + task.id}/>
            </td>
            <td className="w-150 overflow-hidden">
                <SimpleCell name={task.title} />
            </td>
            <td className="w-60 overflow-hidden">
                <SimpleCell name={task.project} />
            </td>
            <td className="w-40 overflow-hidden">
                <ResourceCell name={task.responsable}/>
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

interface StatusColourMap {
    [key: string]: ColouredCellColours;
}

const statusColourMap : StatusColourMap = {
    "Abierta": "green",
    "Cerrada" : "red"
}