import { useRouter } from 'next/router';
import TextButton from '@/components/button/textButton';
import Breadcrumb from '@/components/breadcrumb';
import { useEffect, useState } from 'react';
import TicketsProjectTable from '@/components/compactTable/projects/ticketTableProjects';
import ticketsList from '@/components/ticketsMock';
import Ticket from '@/types/ticket';

export default function ViewTickets() {
    const router = useRouter();
    const { project: projectId, id: taskId } = router.query;

    const [tickets, setTickets] = useState<Ticket[]>([])

    useEffect(() => {
        // TODO: API call para obtener tickets del back
        setTickets(ticketsList)
    }, [])

    return (
        <>
            <Breadcrumb steps={[
                { name: "Proyectos", link: "/projects/" },
                { name: "Gestión de Proyectos", link: "/projects/gestionarProyectos" },
                { name: `${projectId}`, link: `/projects/gestionarProyectos/${projectId}` },
                { name: "Tareas del proyecto", link: `/projects/gestionarProyectos/${projectId}/tareas`}, 
                { name: `#${taskId}`, link: `/projects/gestionarProyectos/${projectId}/tareas/${taskId}` },
                { name: "Tickets asociados", link: null }
            ]} />
            <div className="space-y-4">
                <header className="flex items-center">
                  <h1 className="text-2xl sm:text-4xl font-bold text-title line-clamp-2 sm:line-clamp-1 py-1">Tickets asociados a la Tarea</h1>
                </header>  
                <TicketsProjectTable
                    tickets={tickets} />

                <div className="flex items-center justify-start gap-x-6 px-4">
                    <TextButton
                        name="Volver"
                        style="transparent"
                        onClick={() => router.back()} />
                </div>
            </div>
        </>
    )
}