import Ticket from "@/types/ticket";
import CompactTable from "../compactTable";
import TicketRow from "./ticketRow";

interface TicketTableProps {
  tickets: Ticket[];
  setTickets: (tickets: Ticket[]) => void;
  productId: number;
  versionId: number;
}

export default function TicketTable({
  tickets,
  setTickets,
  productId,
  versionId,
}: TicketTableProps) {
  const headers = [
    "Título",
    "Fecha de creación",
    "Responsable",
    "Cliente",
    "Estado",
    "Severidad",
    "Acciones",
  ];

  const removeTicketFromTable = (ticketId: number) => {
    setTickets(tickets.filter((ticket) => ticket.id !== ticketId));
  };
  return (
    <CompactTable
      headerTitles={headers}
      rows={tickets.map((ticket) => (
        <TicketRow
          key={ticket.id}
          ticket={ticket}
          productId={productId}
          versionId={versionId}
          removeTicket={() => removeTicketFromTable(ticket.id)}
        />
      ))}
    />
  );
}
