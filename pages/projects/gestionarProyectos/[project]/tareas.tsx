import Breadcrumb from "@/components/breadcrumb";
import TextButton from "@/components/button/textButton";
import TaskTable from "@/components/compactTable/projects/taskTable";
import tasksList from "@/components/tasksMock";
import Task from "@/types/task";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ViewTasks() {
    const router = useRouter();
    const { project: projectId } = router.query;

    const [tasks, setTasks] = useState<Task[]>([])

    useEffect(() => {
        // TODO: API call para obtener tareas del back
        setTasks(tasksList)
    }, [])

    const handleNewTaskButton = () => {
        router.push(`/projects/gestionarProyectos/${projectId}/tareas/crearTarea`)
    }

    return (
        <>
            <Breadcrumb steps={[
                { name: "Proyectos", link: "/projects/" },
                { name: "Gestión de Proyectos", link: "/projects/gestionarProyectos" },
                { name: `${projectId}`, link: `/projects/gestionarProyectos/${projectId}` },
                { name: "Tareas del proyecto", link: null}
            ]} />
            <div className="space-y-4">
                <header className="flex items-center">
                  <h1 className="text-2xl sm:text-4xl font-bold text-title line-clamp-2 sm:line-clamp-1 py-1">Tareas del Proyecto</h1>
                </header>
                <div className="my-5 flex items-center justify-end gap-x-6 px-4">
                    <TextButton name="Crear tarea" style="secondary" onClick={handleNewTaskButton} />
                </div>
                <TaskTable
                    tasks={tasks}
                    projectId={projectId as string} />
                <div className="flex items-center justify-start gap-x-6 px-4">
                    <TextButton
                        name="Volver"
                        style="transparent"
                        onClick={() => router.back()} />
                </div>
            </div>
        </>
    )
}