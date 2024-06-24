import { useRouter } from 'next/router';
import VersionHeader from "@/components/versionHeader";
import Breadcrumb from "@/components/breadcrumb";
import TextButton from "@/components/button/textButton";
import Ticket from "@/types/ticket";
import TicketTable from "@/components/compactTable/tickets/ticketTable";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getTicketsByVersion, getVersion } from '@/services/supportService';
import EmptyPageText from '@/components/emptyPageText';
import Loading from '@/components/loader';

export default function Tickets() {
    const router = useRouter();
    const { product: productId, version: versionId } = router.query;

    const handleNewTicketButton = () => {
        router.push(`/versions/${productId}/${versionId}/new`)
    }

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [tickets, setTickets] = useState<Ticket[]>([])
    const [productName, setProductName] = useState<string>("")
    const [versionName, setVersionName] = useState<string>("")

    useEffect(() => {
        let ticketsPromise = getTicketsByVersion(versionId as unknown as number)
        let versionPromise = getVersion(Number(versionId))

        Promise.all([ticketsPromise, versionPromise]).then(([tickets, version]) => {
            setTickets(tickets)
            setProductName(version.product.name)
            setVersionName(version.name)
            setIsLoading(false)
        })
    }, [])

    return (
        <>
            {!isLoading && <Breadcrumb steps={[
                { name: "Versiones", link: "/versions/" },
                { name: `${productName} - ${versionName}`, link: null } 
            ]} />}
            <div className="space-y-4">
                {!isLoading && <VersionHeader
                    productId={productName}
                    versionId={versionName}
                    ticketId=""
                    title="Tickets" />}
                {tickets.length > 0 && !isLoading && <div className="my-5 flex items-center justify-end gap-x-6 px-4">
                    <TextButton name="Crear ticket" style="secondary" onClick={handleNewTicketButton} />
                </div>}
                {tickets.length > 0 && !isLoading && <TicketTable
                    tickets={tickets}
                    setTickets={setTickets}
                    productId={Number(productId)}
                    versionId={Number(versionId)} />}
                {tickets.length === 0 && !isLoading &&
                    <EmptyPageText
                        text="No hay tickets creados"
                        description="Puede crear un nuevo ticket para esta versión"
                        icon="ticket"/>}
                {tickets.length === 0 && !isLoading &&
                    <div className="my-5 flex items-center justify-center gap-x-6">
                        <TextButton name="Crear ticket" style="secondary" onClick={handleNewTicketButton} />
                    </div>}
                {tickets.length === 0 && isLoading && <Loading data="tickets"/>}
                <div className="flex items-center justify-start gap-x-6 px-4">
                    <Link href="/versions">
                        <TextButton
                            name="Volver"
                            style="transparent" />
                    </Link>
                </div>
            </div>
        </>
    )
}
