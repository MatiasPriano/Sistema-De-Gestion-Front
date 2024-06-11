interface TaskGridRowProps {
    title: string;
    description: string;
    responsable: string;
    state: string;
}

export default function TaskGridRow({ task }: {task: TaskGridRowProps}) {
    return (
        <tr key={`${task.title}`} className="h-16">
            <td className="px-6 py-3 h-full w-1/4">
                <div className="text-s text-gray-900 line-clamp-3 max-w-sm">
                    <div className="truncate">{task.title}</div>
                </div>
            </td>

            <td className="px-6 py-3 h-full w-1/2">
                <div className="text-xs text-gray-900 line-clamp-3 max-w-sm">
                    {task.description}
                </div>
            </td>

            <td className="px-6 py-3 h-full w-1/8">
                <div className="flex items-center text-gray-900 overflow-hidden max-w-xs">
                    <div className="truncate">{task.responsable}</div>
                </div>
            </td>
            <td className="px-6 py-3 h-full w-1/8">
                <span className={`${task.state === "Abierta" ? "bg-green-400" : "bg-red-400"} text-sm text-gray-900 rounded-md px-2 py-1 ml-2`}>
                    {task.state}
                </span>
            </td>
        </tr>
    )
}