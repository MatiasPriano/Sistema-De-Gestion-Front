interface TaskGridRowProps {
    title: string;
    description: string;
    responsable: string;
    state: string;
}

export default function TaskGridRow({ task }: {task: TaskGridRowProps}) {
    return (
        <tr key={`${task.title}`} className="h-16">
            <td className="px-6 py-3 border-b border-gray-200 h-full">
                <div className="flex items-center text-gray-900 overflow-hidden max-w-xs">
                    <div className="truncate">{task.title}</div>
                </div>
            </td>

            <td className="px-6 py-3 border-b border-gray-200 h-full">
                <div className="text-xs leading-5 text-gray-900 line-clamp-3 max-w-sm">
                    {task.description}
                </div>
            </td>

            <td className="px-6 py-3 border-b border-gray-200 h-full">
                <div className="flex items-center">{task.responsable}</div>
            </td>
            <td className="px-6 py-3 border-b border-gray-200 h-full">
                <span className={`${task.state === "Abierta" ? "bg-green-400" : "bg-red-400"} text-sm text-gray-900 rounded-md px-2 py-1 ml-2`}>
                    {task.state}
                </span>
            </td>
        </tr>
    )
}