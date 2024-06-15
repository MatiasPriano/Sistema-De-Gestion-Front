import Task from "@/types/task";

export default function TicketTaskRow({ task }: { task: Task }) {
    return (
        <tr key={task.id} >
            <td className="w-20 overflow-hidden">
                <div className="line-clamp-1 text-sm mx-2 text-gray-900">#{task.id}</div>
            </td>
            <td className="w-150 overflow-hidden">
                <div className="line-clamp-1 text-sm mx-2 text-gray-900">{task.title}</div>
            </td>
            <td className="w-60 overflow-hidden">
                <div className="line-clamp-1 text-sm mx-2 text-gray-900">{task.project}</div>
            </td>
            <td className="w-40 overflow-hidden">
                <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2 flex-shrink-0">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                    <div className="line-clamp-1 text-sm mx-2 text-gray-900">{task.responsable}</div>
                </div>
                
            </td>
            <td className="w-20 overflow-hidden">
                <div className={getStatusClass(task.status)}>{task.status}</div>
            </td>
        </tr>
        
    );
}

function getStatusClass(status: string) {
    let className = 'text-sm text-gray-900 rounded-md px-5 mx-5 py-1 my-1 text-gray-900'
    if (status === 'Abierta') {
        className += ' bg-green-400'
    } else {
        className += ' bg-red-400'
    }
    return className
}