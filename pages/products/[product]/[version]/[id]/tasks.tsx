import { useRouter } from 'next/router';
import VersionHeader from '@/components/versionHeader';
import TicketTaskTable from '@/components/compactTable/ticketTasks/ticketTaskTable';
import Task from '@/types/task';
import EmptyTableText from '@/components/compactTable/emptyTableText';
import TextButton from '@/components/button/textButton';

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
            {tasks.length > 0 && <div className="my-5 flex items-center justify-end gap-x-6">
                <TextButton name="Crear tarea" style="primary" onClick={handleNewTaskButton} />
                <TextButton name="Asociar tareas" style="secondary" onClick={handleLinkTaskButton} />
            </div>}
            {tasks.length > 0 && <TicketTaskTable tasks={tasks} />}
            {tasks.length === 0 && <EmptyTableText text="No hay tareas asignadas a este ticket" icon="task"/>}
            {tasks.length === 0 &&
                <div className="my-5 flex items-center justify-center gap-x-6">
                    <TextButton name="Crear tarea" style="primary" onClick={handleNewTaskButton} />
                    <TextButton name="Asociar tareas" style="secondary" onClick={handleLinkTaskButton} />
                </div>
            }
        </div>
    )
}