import { useRouter } from 'next/router';
import Ticket, { TicketMode } from '@/components/ticketForm';
import VersionHeader from '@/components/versionHeader';

export default function ViewTicket() {
    const router = useRouter();
    const { product, version, id } = router.query;

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
            <VersionHeader  productId={product as string}
                            versionId={version as string}
                            ticketId={id as string}
                            title="Ticket"
            >
            </VersionHeader>
            
            <Ticket productId={product as string}
                    versionId={version as string}
                    ticketId={id as string}
                    titleDisabled={true} title={ticketExample.title}
                    responsableDisabled={true} responsable={ticketExample.responsable}
                    descriptionDisabled={true} description={ticketExample.description}
                    stateDisabled={true} state={ticketExample.state}
                    severityDisabled={true} severity={ticketExample.severity}
                    clientDisabled={true} client={ticketExample.client}
                    mode={TicketMode.View}/>
        </div>
    )
}
