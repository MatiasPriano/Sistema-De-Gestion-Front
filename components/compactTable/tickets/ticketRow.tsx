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

export default function TicketRow({ ticket, productId, versionId }: { ticket: Ticket, productId: string, versionId: string }) {
    const router = useRouter()
    const handleViewButtonClick = () => {
        router.push(`/products/${productId}/${versionId}/${ticket.id}`)
    }
    const handleEditButtonClick = () => {
        router.push(`/products/${productId}/${versionId}/${ticket.id}/edit`)
    }
    const handleViewTasksButtonClick = () => {
        router.push(`/products/${productId}/${versionId}/${ticket.id}/tasks`)
    }

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    
    const handleDialogDelete = () => {
        // TODO: API call para eliminar ticket
        toast.success("Ticket eliminado")
        setIsDeleteDialogOpen(false)
    }
    const handleDialogCancel = () => {
        setIsDeleteDialogOpen(false)
    }
    const handleDeleteTicketButton = () => {
        setIsDeleteDialogOpen(true)
    }

    const actions: Action[] = [
        {
            icon: "view",
            onClick: handleViewButtonClick,
            title: "Ver ticket"
        },
        {
            icon: "edit",
            onClick: handleEditButtonClick,
            title: "Editar ticket"
        },
        {
            icon: "list",
            onClick: handleViewTasksButtonClick,
            title: "Ver tareas asociadas"
        },
        {
            icon: "trash",
            onClick: handleDeleteTicketButton,
            title: "Eliminar ticket"
        }
    ]

    return (
        <tr key={ticket.id} >
            <td className="overflow-hidden">
                <SimpleCell name={ticket.title} />
            </td>
            <td className="overflow-hidden">
                <SimpleCell name={ticket.createdDateTime} centered={true} />
            </td>
            <td className="overflow-hidden">
                <ResourceCell name={ticket.employee.Nombre + " " + ticket.employee.Apellido} />
            </td>
            <td className="overflow-hidden">
                <SimpleCell name={ticket.client["razon social"]} centered={true} />
            </td>
            <td className="overflow-hidden">
                <SimpleCell name={ticket.status} centered={true} />
            </td>
            <td className="overflow-hidden">
                <ColouredCell name={ticket.severity} colour={severityColours[ticket.severity]} />
            </td>
            <td className="overflow-hidden">
                <ActionsCell actions={actions}/>
            </td>
            <ConfirmationDialog
                isOpen={isDeleteDialogOpen}
                title="Eliminar ticket"
                message="¿Está seguro/a de que desea eliminar este ticket?"
                onConfirm={handleDialogDelete}
                onCancel={handleDialogCancel} />
        </tr>
        
    );
}
