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

    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        if (taskId) {
            fetch(`https://projects-backend-am35.onrender.com/tasks/?ids=${taskId}`, {
                method: "GET",
                headers: {
                    "Accept": "*/*"
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Error al obtener los tickets asociados");
            })
            .then(data => {
                // Verificar que data sea un array y tenga al menos un elemento
                if (Array.isArray(data) && data.length > 0) {
                    const task = data[0];
                    const associatedTickets = task.associatedTickets;

                    if (!associatedTickets || associatedTickets.length === 0) {
                        throw new Error("No se encontraron tickets asociados");
                    }

                    // Obtener los detalles de cada ticket
                    const ticketPromises = associatedTickets.map(ticket =>
                        fetch(`https://sistema-de-gestion-soporte-3.onrender.com/v1/tickets/${ticket.ticketId}`)
                        .then(response => {
                            if (response.ok) {
                                return response.json();
                            }
                            throw new Error("Error al obtener la información del ticket");
                        })
                    );

                    // Esperar a que todas las promesas se resuelvan
                    return Promise.all(ticketPromises);
                } else {
                    throw new Error("Respuesta de la API no válida");
                }
            })
            .then(detailedTickets => {
                setTickets(detailedTickets);
                setError(null);
            })
            .catch(error => {
                console.error('Error:', error);
                setError(error.message);
            });
        }
    }, [taskId]);
    
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