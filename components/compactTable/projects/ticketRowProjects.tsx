import SimpleCell from "../cells/simpleCell";
import ActionsCell, { Action } from "../cells/actionsCell";
import Ticket from "@/types/ticket";
import ResourceCell from "../cells/resourceCell";
import { useRouter } from "next/router";
import ConfirmationDialog from "@/components/confirmationDialog";
import { useState } from "react";
import { toast } from "react-hot-toast";
import ColouredCell, { ColouredCellColours } from "../cells/colouredCell";

const severityColours: Record<"S1" | "S2" | "S3" | "S4", ColouredCellColours> = {
    "S1": "red",
    "S2": "orange",
    "S3": "yellow",
    "S4": "green",
};

export default function TicketsProjectRow({ ticket }: { ticket: Ticket }) {
    return (
        <tr key={ticket.id} >
            <td className="overflow-hidden">
                <SimpleCell name={ticket.title} />
            </td>
            <td className="overflow-hidden">
                <SimpleCell name={ticket.createdDateTime} centered={true} />
            </td>
            <td className="overflow-hidden">
                <ResourceCell name={ticket.responsable} />
            </td>
            <td className="overflow-hidden">
                <SimpleCell name={ticket.client} centered={true} />
            </td>
            <td className="overflow-hidden">
                <SimpleCell name={ticket.status} centered={true} />
            </td>
            <td className="overflow-hidden">
                <ColouredCell name={ticket.severity} colour={severityColours[ticket.severity]} />
            </td>
        </tr>
        
    );
}
