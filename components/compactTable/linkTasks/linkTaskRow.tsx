import Task from "@/types/task";
import SimpleCell from "../cells/simpleCell";
import ColouredCell, { ColouredCellColours } from "../cells/colouredCell";
import { stateToPrintable } from "@/types/taskState";
import { priorityToPrintable } from "@/types/taskPriority";

interface LinkTaskRowProps {
  task: Task;
  selected: boolean;
  setSelected: (taskId: number, selected: boolean) => void;
}

export default function LinkTaskRow({
  task,
  selected,
  setSelected,
}: LinkTaskRowProps) {
  const toggleCheckbox = () => {
    setSelected(task.id, !selected);
  };

    return (
        <tr key={task.id} className={getCheckBoxClass(selected)} onClick={toggleCheckbox} >
            <td className="w-5 overflow-hidden">
                <div className="text-title rounded-md mx-2 flex items-center">
                    <input  type="checkbox"
                            className="form-checkbox h-4 w-4 text-primary"
                            onChange={toggleCheckbox}
                            checked={selected} />
                </div>
            </td>
            <td className="w-10 overflow-hidden">
                <SimpleCell name={"#" + task.id} />
            </td>
            <td className="w-50 overflow-hidden">
                <SimpleCell name={task.title} />
            </td>
            <td className="w-15 overflow-hidden">
                <SimpleCell name={priorityToPrintable(task.priority)} centered={true} />
            </td>
            <td className="w-64 overflow-hidden">
                <ColouredCell name={stateToPrintable(task.state)} colour={statusColourMap[task.state]} />
            </td>
        </tr>
    );
}

function getCheckBoxClass(isChecked: boolean) {
  let className = "transition-all duration-200 text-title";

  if (isChecked) {
    className += " bg-selected";
  }
  return className;
}

interface StatusColourMap {
  [key: string]: ColouredCellColours;
}

const statusColourMap : StatusColourMap = {
    "OPEN": "green",
    "CLOSED" : "red",
    "BLOCKED" : "orange",
    "FINISHED" : "green",
    "PROGRESS" : "yellow"
}