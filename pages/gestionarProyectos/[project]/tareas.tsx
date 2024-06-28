import Breadcrumb from "@/components/breadcrumb";
import TextButton from "@/components/button/textButton";
import TaskTable from "@/components/compactTable/projects/taskTable";
import { getEmployees } from "@/services/supportService";
import Employee from "@/types/employee";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";

export default function ViewTasks() {
    const router = useRouter();
    const { project: projectId } = router.query;

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const resourcePromise = getEmployees();
        if (projectId) {
            const taskPromise =  fetch(`https://projects-backend-am35.onrender.com/proyect/${projectId}/tasks/get`, {
                method: "GET",
                headers: {
                    "Accept": "*/*"
                }
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error("Error al obtener la lista de tareas");
                })
                Promise.all([resourcePromise, taskPromise]).then(([resources, data]) => {
                    // Ajustar según la estructura de respuesta de la API

                    const tasks = data.map((task:any) => {
                        let employeeName = null;
                        if(task.assignedEmployee){

                            let  employee = resources.filter((resource)=>resource.legajo === task.assignedEmployee)[0]
                            employeeName = employee.Nombre + " " + employee.Apellido;
                  
                            }else{
                              employeeName = "Sin asignar" 
                            }


                    return{
                        id: task.id,
                        title: task.title,
                        description: task.description,
                        state: task.state,
                        responsable: employeeName, 
                        priority: task.priority,
                        startDate: new Date(task.startDate).toLocaleDateString(),
                        finishDate: task.finishDate ? new Date(task.finishDate).toLocaleDateString() : 'Sin fecha',
                        daysToComplete: task.daysToComplete,
                        associatedTickets: task.associatedTickets,
                        firstTicketDate: task.firstTicketDate ? new Date(task.firstTicketDate).toLocaleDateString() : 'Sin fecha',
                        firstTicketId: task.firstTicketId,
                    }});
                    setTasks(tasks);
                })
                .catch(error => {
                    console.error("Error:", error);
                });
        }
    }, [projectId]);

    const handleNewTaskButton = () => {
        router.push(`/gestionarProyectos/${projectId}/tareas/crearTarea`);
    };
    console.log("estoy buscando este task:!!!")
    console.log(tasks)
    return (
        <>
            <Breadcrumb steps={[
                { name: "Gestión de Proyectos", link: "/gestionarProyectos" },
                { name: `${projectId}`, link: `/gestionarProyectos/${projectId}` },
                { name: "Tareas del proyecto", link: null }
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
                    <Link href={`/gestionarProyectos/`}>
                        <TextButton name="Volver" style="transparent" />
                    </Link>
                </div>
            </div>
        </>
    );
}

