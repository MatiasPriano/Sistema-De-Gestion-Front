import { useRouter } from 'next/router';
import Ticket, { TicketMode } from '@/components/ticketForm';
import VersionHeader from '@/components/versionHeader';

export default function NewTicket() {
    const router = useRouter();
    const { product, version } = router.query;

    return (
        <div className="container max-w-7xl mx-auto mt-8 sm:mt-4">
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
