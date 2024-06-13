import React from 'react';

interface TaskGridRowProps {
    title: string;
    description: string;
    responsable: string;
    project: string;
    state: string;
}

export default function TaskGridRow({ task }: { task: TaskGridRowProps }) {
    return (
        <tr key={`${task.title}`} className="h-10">
            <td className="px-2 py-3">
                <div className="flex items-center">
                    <div className="text-s text-gray-900 max-w-xs">
                        <div className="truncate">{task.title}</div>
                    </div>
                </div>
            </td>

            <td className="px-2 py-3">
                <div className="flex items-center">
                    <div className="text-xs text-gray-900 line-clamp-3 max-w-xs">
                        {task.description}
                    </div>
                </div>
            </td>

            <td className="px-2 py-3">
                <div className="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1 flex-shrink-0">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                    <div className="text-xs text-gray-900 line-clamp-1 max-w-xs">
                        {task.responsable}
                    </div>
                </div>
            </td>
            <td className="px-2 py-3">
                <div className="text-xs text-gray-900 line-clamp-2 max-w-xs">
                    {task.project}
                </div>
            </td>
            <td className="px-2 py-3">
                <span className={`${task.state === "Abierta" ? "bg-green-400" : "bg-red-400"} text-sm text-gray-900 rounded-md px-2 py-1 ml-2`}>
                    {task.state}
                </span>
            </td>
        </tr>
    )
}
