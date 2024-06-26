import SimpleCell from "../cells/simpleCell";
import ActionsCell, { Action } from "../cells/actionsCell";
import Ticket from "@/types/ticket";
import ResourceCell from "../cells/resourceCell";
import { useRouter } from "next/router";
import ConfirmationDialog from "@/components/confirmationDialog";
import { useState } from "react";
import { toast } from "react-hot-toast";
import ColouredCell, { ColouredCellColours } from "../cells/colouredCell";
import Employee from "@/types/employee";
import { deleteTicket } from "@/services/supportService";

const severityColours: Record<"S1" | "S2" | "S3" | "S4", ColouredCellColours> =
  {
    S1: "red",
    S2: "orange",
    S3: "yellow",
    S4: "green",
  };

interface TicketRowProps {
  ticket: Ticket;
  productId: number;
  versionId: number;
  removeTicket: () => void;
}

export default function TicketRow({
  ticket,
  productId,
  versionId,
  removeTicket,
}: TicketRowProps) {
  const router = useRouter();
  const handleViewButtonClick = () => {
    router.push(`/versions/${productId}/${versionId}/${ticket.id}`);
  };
  const handleEditButtonClick = () => {
    router.push(`/versions/${productId}/${versionId}/${ticket.id}/edit`);
  };
  const handleViewTasksButtonClick = () => {
    router.push(`/versions/${productId}/${versionId}/${ticket.id}/tasks`);
  };

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDialogDelete = () => {
    deleteTicket(ticket.id).then((wasDeleted) => {
      setIsDeleteDialogOpen(false);
      if (wasDeleted) {
        toast.success("Ticket eliminado");
        removeTicket();
      } else {
        toast.error("No se pudo eliminar el ticket");
      }
    });
  };
  const handleDialogCancel = () => {
    setIsDeleteDialogOpen(false);
  };
  const handleDeleteTicketButton = () => {
    setIsDeleteDialogOpen(true);
  };

  const actions: Action[] = [
    {
      icon: "view",
      onClick: handleViewButtonClick,
      title: "Ver ticket",
    },
    {
      icon: "edit",
      onClick: handleEditButtonClick,
      title: "Editar ticket",
    },
    {
      icon: "list",
      onClick: handleViewTasksButtonClick,
      title: "Ver tareas asociadas",
    },
    {
      icon: "trash",
      onClick: handleDeleteTicketButton,
      title: "Eliminar ticket",
    },
  ];

  return (
    <tr key={ticket.id}>
      <td className="overflow-hidden">
        <SimpleCell name={ticket.title} />
      </td>
      <td className="overflow-hidden">
        <SimpleCell name={ticket.createdDateTime} centered={true} />
      </td>
      <td className="overflow-hidden">
        <ResourceCell name={getEmployeeName(ticket.employee)} />
      </td>
      <td className="overflow-hidden">
        <SimpleCell name={ticket.client["razon social"]} centered={true} />
      </td>
      <td className="overflow-hidden">
        <SimpleCell name={ticket.status} centered={true} />
      </td>
      <td className="overflow-hidden">
        <ColouredCell
          name={ticket.severity}
          colour={severityColours[ticket.severity]}
        />
      </td>
      <td className="overflow-hidden">
        <ActionsCell actions={actions} />
      </td>
      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        title="Eliminar ticket"
        message="¿Está seguro/a de que desea eliminar este ticket?"
        onConfirm={handleDialogDelete}
        onCancel={handleDialogCancel}
      />
    </tr>
  );
}

function getEmployeeName(employee: Employee | null) {
  if (employee) {
    return employee.Nombre + " " + employee.Apellido;
  } else {
    return "No definido";
  }
}
