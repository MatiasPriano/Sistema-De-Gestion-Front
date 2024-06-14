import { useRouter } from 'next/router';
import Ticket, { TicketMode } from '@/components/ticketForm';
import VersionHeader from '@/components/versionHeader';

export default function NewTicket() {
    const router = useRouter();
    const { product, version } = router.query;

    return (
        <div>
            <VersionHeader  productId={product as string}
                            versionId={version as string}
                            ticketId=""
                            title="Nuevo ticket"
            />
            <Ticket productId={product as string}
                    versionId={version as string}
                    stateDisabled={true} state="Nuevo"
                    mode={TicketMode.New}/>
        </div>
    )
}
