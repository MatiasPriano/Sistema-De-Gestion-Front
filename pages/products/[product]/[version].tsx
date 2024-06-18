import { useRouter } from 'next/router';
import VersionHeader from "@/components/versionHeader";
import ticketsList from "@/components/ticketsMock";
import Breadcrumb from "@/components/breadcrumb";
import TextButton from "@/components/button/textButton";
import Ticket from "@/types/ticket";
import TicketTable from "@/components/compactTable/tickets/ticketTable";

export default function Tickets() {
    const router = useRouter();
    const { product, version } = router.query;

    const handleNewTicketButton = () => {
        router.push(`/products/${product}/${version}/new`)
    }
    const tickets: Ticket[] = ticketsList

    return (
        <>
            <Breadcrumb steps={[
                { name: "Productos", link: "/products/" },
                { name: `${product} - ${version}`, link: null } 
            ]} />
            <VersionHeader
                productId={product as string}
                versionId={version as string}
                ticketId=""
                title="Tickets" />
            {tickets.length > 0 && <div className="my-5 flex items-center justify-end gap-x-6">
                <TextButton name="Crear ticket" style="secondary" onClick={handleNewTicketButton} />
            </div>}
            <TicketTable
                tickets={tickets}
                productId={product as string}
                versionId={version as string} />
        </>
    )
}
