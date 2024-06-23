import Ticket from "@/types/ticket"
import CompactTable from "../compactTable"
import TicketRow from "./ticketRowProjects"

export default function TicketTable({ tickets, productId, versionId }: { tickets: Ticket[], productId: string, versionId: string }) {
    const headers = ["Título", "Fecha de creación", "Responsable", "Cliente", "Estado", "Severidad", "Acciones"]
    return (
        <CompactTable
            headerTitles={headers}
            rows={tickets.map((ticket) => (
                <TicketRow ticket={ticket} productId={productId} versionId={versionId} />
            ))} />
    )
}