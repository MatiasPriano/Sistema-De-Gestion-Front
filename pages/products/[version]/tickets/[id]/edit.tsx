import { useRouter } from 'next/router';
import Ticket, { TicketMode } from '@/components/ticket';

export default function ViewTicket() {
    const router = useRouter();
    const { version, id } = router.query;

    const ticketExample = {
        title: "TKT-123",
        responsable: "Juanito",
        description: "Al agregar un ticket con severidad 4, se guarda como severidad 3",
        state: "En proceso",
        severity: "S4",
        client: "3 Amigos Tecnologies"
    }

    return (
        <div className="container max-w-7xl mx-auto mt-8 sm:mt-4">
            <div className="mb-4">
                <h1 className="text-3xl font-bold decoration-gray-400">Editar ticket {id}</h1>
                <h2 className="text-xl decoration-gray-700">Producto: {version}</h2>
            </div>
            <Ticket version={version as string}
                    titleDisabled={true} title={ticketExample.title}
                    responsable={ticketExample.responsable}
                    description={ticketExample.description}
                    state={ticketExample.state}
                    severity={ticketExample.severity}
                    clientDisabled={true} client={ticketExample.client}
                    includeButtons={true}
                    mode={TicketMode.Edit} />
        </div>
    )
}