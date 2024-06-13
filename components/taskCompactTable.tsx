import TaskCompactRow, { Task } from "./taskCompactRow"

function HeaderItem({ title }: { title: string }) {
    return <th className="px-6 py-2 text-sm text-white bg-blue-950">{title}</th>
}

export default function TaskCompactTable({ tasks }: { tasks: Task[] }) {
    return (
        <div className='rounded-xl border border-blue-950 overflow-hidden'>
            <table className="table-fixed">
                <thead>
                    <HeaderItem title="Selec."/>
                    <HeaderItem title="ID"/>
                    <HeaderItem title="Título"/>
                    <HeaderItem title="Proyecto"/>
                    <HeaderItem title="Responsable"/>
                    <HeaderItem title="Estado"/>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <TaskCompactRow task={task} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}