import { useRouter } from "next/router";
import VersionHeader from "@/components/versionHeader";
import TicketTaskTable from "@/components/compactTable/ticketTasks/ticketTaskTable";
import Task from "@/types/task";
import EmptyPageText from "@/components/emptyPageText";
import TextButton from "@/components/button/textButton";
import Breadcrumb from "@/components/breadcrumb";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import ConfirmationDialog from "@/components/confirmationDialog";
import {
  desassociateTasks,
  getTaskIdsByTicket,
  getTasks,
  getVersion,
} from "@/services/supportService";
import Loading from "@/components/loader";

export default function ViewTasks() {
  const router = useRouter();
  const { product: productId, version: versionId, id: ticketId } = router.query;

  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);

  const handleNewTaskButton = () => {
    router.push(`/versions/${productId}/${versionId}/${ticketId}/tasks/new/`);
  };

    const handleLinkTaskButton = () => {
        router.push(`/versions/${productId}/${versionId}/${ticketId}/tasks/link/`)
    }

    const [tasks, setTasks] = useState<Task[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [productName, setProductName] = useState<string>("")
    const [versionName, setVersionName] = useState<string>("")
    useEffect(() => {
        let taskIdsPromise = getTaskIdsByTicket(Number(ticketId))
        let versionPromise = getVersion(Number(versionId))

    Promise.all([taskIdsPromise, versionPromise]).then(([taskIds, version]) => {
      setProductName(version.product.name);
      setVersionName(version.name);
      getTasks(taskIds).then((tasks: Task[]) => {
        setTasks(tasks);
        setIsLoading(false);
      });
    });
  }, []);

  const [isUnlinkDialogOpen, setIsUnlinkDialogOpen] = useState(false);

  const handleUnlinkTaskClick = () => {
    setIsUnlinkDialogOpen(true);
  };

  const handleDialogUnlink = () => {
    // TODO: API call para obtener tareas del back
    setIsUnlinkDialogOpen(false);
    desassociateTasks(Number(ticketId), selectedTasks).then((wasUnlinked) => {
      if (wasUnlinked) {
        if (selectedTasks.length === 1) toast.success("1 tarea desasociada");
        else toast.success(`${selectedTasks.length} tareas desasociadas`);
        setTasks(tasks.filter((task) => !selectedTasks.includes(task.id)));
      } else {
        toast.error("Hubo un problema al desasociar tareas");
      }
      setSelectedTasks([]);
    });
  };

  const handleUnlinkCancel = () => {
    setIsUnlinkDialogOpen(false);
    setSelectedTasks([]);
  };

    return (
        <>
            {!isLoading && <Breadcrumb steps={[
                { name: "Versiones", link: `/versions/` },
                { name: `${productName} - ${versionName}`, link: `/versions/${productId}/${versionId}/` },
                { name: `#${ticketId}`, link: `/versions/${productId}/${versionId}/${ticketId}` },
                { name: "Tareas asociadas", link: null }
            ]} />}
            <div className="space-y-4">
                {!isLoading && <VersionHeader  productId={productName}
                                versionId={versionName}
                                ticketId={ticketId as string}
                                title="Tareas asociadas al ticket" />}
                {tasks.length > 0 && !isLoading && 
                    <div className="flex my-5 px-4">
                        <div className="flex items-center justify-start gap-x-6">
                            <TextButton
                                name="Desasociar"
                                style="red"
                                onClick={handleUnlinkTaskClick}
                                disabled={selectedTasks.length === 0} />
                        </div>
                        <div className="flex items-center justify-end space-x-4 w-full">
                            <TextButton name="Crear tarea" style="secondary" onClick={handleNewTaskButton} />
                            <TextButton name="Ir a Asociar tareas" style="primary" onClick={handleLinkTaskButton} />
                        </div>
                    </div>}
                {tasks.length > 0 && !isLoading && 
                    <TicketTaskTable
                        tasks={tasks}
                        selectedTasks={selectedTasks}
                        setSelectedTasks={setSelectedTasks} />}
                {tasks.length === 0 && !isLoading &&
                    <EmptyPageText
                        text="No hay tareas asignadas a este ticket"
                        description="Puede crear una nueva tarea para este ticket, o asociar una tarea ya existente"
                        icon="task"/>}
                {tasks.length === 0 && !isLoading && 
                    <div className="my-5 flex items-center justify-center gap-x-6">
                        <TextButton name="Crear tarea" style="primary" onClick={handleNewTaskButton} />
                        <TextButton name="Asociar tareas" style="secondary" onClick={handleLinkTaskButton} />
                    </div>
                }
                {tasks.length === 0 && isLoading && <Loading data="tareas"/>}
                <div className="flex items-center justify-start gap-x-6 px-4">
                    <TextButton
                        name="Volver"
                        style="transparent"
                        onClick={() => router.back()} />
                </div>
                <ConfirmationDialog
                    isOpen={isUnlinkDialogOpen}
                    title="Desasociar tareas"
                    message={getUnlinkConfirmationMessage(tasks.filter((task) => selectedTasks.includes(task.id)))}
                    onConfirm={handleDialogUnlink}
                    onCancel={handleUnlinkCancel} />
            </div>
        </>
    )
}

function getUnlinkConfirmationMessage(tasks: Task[]) {
  let message =
    "¿Está seguro/a de que desea desasociar las siguientes tareas? \n";
  for (const task of tasks) {
    message += ` - ${task.title}`;
  }
  return message;
}
