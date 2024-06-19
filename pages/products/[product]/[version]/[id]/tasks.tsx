import { useRouter } from 'next/router';
import VersionHeader from '@/components/versionHeader';
import TicketTaskTable from '@/components/compactTable/ticketTasks/ticketTaskTable';
import Task from '@/types/task';
import EmptyTableText from '@/components/compactTable/emptyTableText';
import TextButton from '@/components/button/textButton';
import Breadcrumb from '@/components/breadcrumb';
import { useEffect, useState } from 'react';
import tasksList from '@/components/tasksMock';

export default function ViewTasks() {
    const router = useRouter();
    const { product: productId, version: versionId, id: ticketId } = router.query;

    const handleNewTaskButton = () => {
        router.push(`/products/${productId}/${versionId}/${ticketId}/tasks/new/`)
    }

    const handleLinkTaskButton = () => {
        router.push(`/products/${productId}/${versionId}/${ticketId}/tasks/link/`)
    }

    const [tasks, setTasks] = useState<Task[]>([])

    useEffect(() => {
        // TODO: API call para obtener tareas del back
        setTasks(tasksList)
    }, [])

    return (
        <div>
            <Breadcrumb steps={[
                { name: "Productos", link: `/products/` },
                { name: `${productId} - ${versionId}`, link: `/products/${productId}/${versionId}/` },
                { name: `#${ticketId}`, link: `/products/${productId}/${versionId}/${ticketId}` },
                { name: "Tareas asociadas", link: null }
            ]} />
            <VersionHeader  productId={productId as string}
                            versionId={versionId as string}
                            ticketId={ticketId as string}
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