import { useRouter } from 'next/router';
import VersionHeader from '@/components/versionHeader';
import TicketTaskTable from '@/components/compactTable/ticketTasks/ticketTaskTable';
import Task from '@/types/task';

export default function ViewTasks() {
    const router = useRouter();
    const { product, version, id } = router.query;

    const tasks: Task[] = [
        {
            id: 1,
            title: "Modificar el monto de una cuota",
            responsable: "Juan Perez",
            project: "Sistema UPP - 2024",
            status: "Abierta",
            priority: "Baja"
        },
        {
            id: 1321,
            title: "Curabitur sed erat ac magna dignissim aliquet. Proin quis mauris felis. Maecenas non arcu porttitor, venenatis leo eu, semper libero. Etiam sed augue vitae lacus placerat consequat nec at magna. Quisque ex turpis, fringilla quis mi in, finibus rutrum elit. Pellentesque non leo quis felis eleifend eleifend. Sed vestibulum nisl et sodales tincidunt. Aenean vitae arcu in urna congue feugiat. Maecenas nec enim sit amet ante lacinia porttitor sit amet non dui. Etiam semper dolor vitae nibh blandit laoreet. Aliquam gravida erat vel lectus porta, et dapibus leo blandit. Aliquam convallis nisi eu magna accumsan dignissim nec auctor nibh.",
            responsable: "Vestibulum placerat justo at augue congue, nec egestas arcu cursus. Donec placerat auctor risus et viverra. Proin porttitor velit eget fermentum ultrices. Aliquam quis tellus id urna malesuada hendrerit. Vivamus congue arcu in euismod cursus. Sed luctus ac lectus sed posuere. Etiam nec eros vitae lorem ultrices viverra. Morbi id est quis felis congue tempor lobortis ut lorem. Sed sollicitudin felis turpis, et condimentum ex viverra id. Phasellus quis egestas ipsum. Sed semper velit eu neque lacinia euismod.",
            project: "Vestibulum placerat justo at augue congue, nec egestas arcu cursus. Donec placerat auctor risus et viverra. Proin porttitor velit eget fermentum ultrices. Aliquam quis tellus id urna malesuada hendrerit. Vivamus congue arcu in euismod cursus. Sed luctus ac lectus sed posuere. Etiam nec eros vitae lorem ultrices viverra. Morbi id est quis felis congue tempor lobortis ut lorem. Sed sollicitudin felis turpis, et condimentum ex viverra id. Phasellus quis egestas ipsum. Sed semper velit eu neque lacinia euismod.",
            status: "Cerrada",
            priority: "Alta"
        }
    ]

    const handleNewTaskButton = () => {
        router.push(`/products/${product}/${version}/${id}/tasks/new/`)
    }

    const handleLinkTaskButton = () => {
        router.push(`/products/${product}/${version}/${id}/tasks/link/`)
    }

    return (
        <div>
            <VersionHeader  productId={product as string}
                            versionId={version as string}
                            ticketId={id as string}
                            title="Tareas asociadas al ticket"
            />
            <div className="my-5 flex items-center justify-end gap-x-6">
                <button
                type="button"
                onClick={handleNewTaskButton}
                className="rounded-md bg-amber-500 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-colors duration-300 ease-in-out hover:bg-amber-200"
                >
                    Crear tarea
                </button>
                <button
                type="submit"
                onClick={handleLinkTaskButton}
                className="rounded-md bg-blue-950 px-3 py-2 text-sm font-semibold text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-colors duration-300 ease-in-out hover:bg-blue-800"
                >
                    Asociar tarea existente
                </button>
            </div>
            <TicketTaskTable tasks={tasks} />
        </div>
    )
}