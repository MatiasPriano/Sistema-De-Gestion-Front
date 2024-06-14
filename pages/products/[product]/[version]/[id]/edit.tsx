import { useRouter } from 'next/router';
import TicketForm, { TicketMode } from '@/components/ticketForm';
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
        <div>
            <VersionHeader  productId={product as string}
                            versionId={version as string}
                            ticketId={id as string}
                            title="Editar un ticket"
            />
            <TicketForm productId={product as string}
                    versionId={version as string}
                    ticketId={id as string}
                    titleDisabled={true} title={ticketExample.title}
                    responsable={ticketExample.responsable}
                    description={ticketExample.description}
                    state={ticketExample.state}
                    severity={ticketExample.severity}
                    clientDisabled={true} client={ticketExample.client}
                    includeButtons={true}
                    mode={TicketMode.Edit}
            />
        </div>
    )
}