import { useRouter } from 'next/router';
import VersionHeader from "@/components/versionHeader";
import ticketsList from "@/components/ticketsMock";
import Breadcrumb from "@/components/breadcrumb";
import TextButton from "@/components/button/textButton";
import Ticket from "@/types/ticket";
import TicketTable from "@/components/compactTable/tickets/ticketTable";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getTicketsByVersion } from '@/services/supportService';
import EmptyPageText from '@/components/emptyPageText';

export default function Tickets() {
    const router = useRouter();
    const { product: productId, version: versionId } = router.query;

    const handleNewTicketButton = () => {
        router.push(`/versions/${productId}/${versionId}/new`)
    }

    const [tickets, setTickets] = useState<Ticket[]>([])
    useEffect(() => {
        // TODO: API call para obtener todos los tickets de la version
        getTicketsByVersion(versionId as unknown as number).then((tickets) => setTickets(tickets))
    }, [])

    return (
        <>
            <Breadcrumb steps={[
                { name: "Versiones", link: "/versions/" },
                { name: `${productId} - ${versionId}`, link: null } 
            ]} />
            <div className="space-y-4">
                <VersionHeader
                    productId={productId as string}
                    versionId={versionId as string}
                    ticketId=""
                    title="Tickets" />
                {tickets.length > 0 && <div className="my-5 flex items-center justify-end gap-x-6 px-4">
                    <TextButton name="Crear ticket" style="secondary" onClick={handleNewTicketButton} />
                </div>}
                {tickets.length > 0 && <TicketTable
                    tickets={tickets}
                    productId={productId as string}
                    versionId={versionId as string} />}
                {tickets.length === 0 &&
                    <EmptyPageText
                        text="No hay tickets creados"
                        description="Puede crear un nuevo ticket para esta versión"
                        icon="ticket"/>}
                {tickets.length === 0 &&
                    <div className="my-5 flex items-center justify-center gap-x-6">
                        <TextButton name="Crear ticket" style="secondary" onClick={handleNewTicketButton} />
                    </div>
                }
                <div className="flex items-center justify-start gap-x-6 px-4">
                    <Link href="/products">
                        <TextButton
                            name="Volver"
                            style="transparent" />
                    </Link>
                </div>
            </div>
        </>
    )
}
