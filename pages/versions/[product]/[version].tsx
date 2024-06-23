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
import EmptyTableText from '@/components/compactTable/emptyTableText';

export default function Tickets() {
    const router = useRouter();
    const { product: productId, version: versionId } = router.query;

    const handleNewTicketButton = () => {
        router.push(`/products/${productId}/${versionId}/new`)
    }

    const [tickets, setTickets] = useState<Ticket[]>([])
    useEffect(() => {
        // TODO: API call para obtener todos los tickets de la version
        getTicketsByVersion(productId as string, versionId as string).then((tickets) => setTickets(tickets))
    }, [])

    return (
        <>
            <Breadcrumb steps={[
                { name: "Productos", link: "/versions/" },
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
                {tickets.length === 0 && <TicketTable
                    tickets={tickets}
                    productId={productId as string}
                    versionId={versionId as string} />}
                {tickets.length === 0 &&
                    <EmptyTableText
                        text="No hay tickets creados para esta versión"
                        description="Puede crear un nuevo ticket para esta versión"
                        icon="task"/>}
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
