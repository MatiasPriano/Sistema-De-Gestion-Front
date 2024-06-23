import { useRouter } from 'next/router';
import VersionHeader from "@/components/versionHeader";
import ticketsList from "@/components/ticketsMock";
import Breadcrumb from "@/components/breadcrumb";
import TextButton from "@/components/button/textButton";
import Ticket from "@/types/ticket";
import TicketTable from "@/components/compactTable/tickets/ticketTable";
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Tickets() {
    const router = useRouter();
    const { product: productId, version: versionId } = router.query;

    const handleNewTicketButton = () => {
        router.push(`/products/${productId}/${versionId}/new`)
    }

    const [tickets, setTickets] = useState<Ticket[]>([])
    useEffect(() => {
        // TODO: API call para obtener todos los tickets de la version
        // fetch(URL.url + '/v1/...')
        // .then((response) =>{
        //     return response.json()
        // })
        // .then((ticketsData) => {
        //     setTickets(ticketsData)
        // })
        setTickets(ticketsList)
    }, [])

    return (
        <>
            <Breadcrumb steps={[
                { name: "Productos", link: "/products/" },
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
                <TicketTable
                    tickets={tickets}
                    productId={productId as string}
                    versionId={versionId as string} />
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
