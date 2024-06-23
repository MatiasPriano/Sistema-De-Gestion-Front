import Ticket from "@/types/ticket"
import CompactTable from "../compactTable"
import TicketRow from "./ticketRowProjects"
import React from "react"
import TicketsProjectRow from "./ticketRowProjects"

export default function TicketsProjectTable({ tickets }: { tickets: Ticket[] }) {
    const headers = ["Título", "Fecha de creación", "Responsable", "Cliente", "Estado", "Severidad"]
    return (
        <CompactTable
            headerTitles={headers}
            rows={tickets.map((ticket) => (
                <TicketsProjectRow ticket={ticket} />
            ))} />
    )
}