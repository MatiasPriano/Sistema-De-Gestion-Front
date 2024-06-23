import Breadcrumb from "@/components/breadcrumb";
import TextButton from "@/components/button/textButton";
import TaskRecordTable from "@/components/compactTable/projects/taskRecordTable";
import tasksList from "@/components/tasksMock";
import Task from "@/types/task";
import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";

export default function ViewTasksRecord() {
    const router = useRouter();
    const { project: projectId } = router.query;

    const [tasks, setTasks] = useState<Task[]>([])

    useEffect(() => {
        // TODO: API call para obtener tareas del back
        setTasks(tasksList)
    }, [])

    return (
        <>
            <Breadcrumb steps={[
                { name: "Proyectos", link: "/projects/" },
                { name: "Historial de Proyectos", link: "/projects/historialProyectos" },
                { name: `Proyecto: ${projectId} - Tareas`, link: null }
            ]} />
            <div className="space-y-4">
                <header className="flex items-center">
                  <h1 className="text-2xl sm:text-4xl font-bold text-title line-clamp-2 sm:line-clamp-1 py-1">Tareas del Proyecto</h1>
                </header>
                <TaskRecordTable
                        tasks={tasks}
                        />
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