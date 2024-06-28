import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Breadcrumb from '@/components/breadcrumb';
import Resource from '@/types/resource';
import getResources from '@/services/resourceService';
import TaskProjectForm, { TaskInputs,TaskMode } from '@/components/form/taskProjectForm';
import tasksList from '@/components/tasksProjectMock';
import React from 'react';
import TaskProject, { emptyTask } from '@/types/taskProjects';
import TextButton from '@/components/button/textButton';

export default function ViewTask() {
    const router = useRouter();
    const { project: projectId, id: taskId } = router.query;

    const [task, setTask] = useState<TaskProject>(emptyTask)

    const disabledInputs: TaskInputs = {
        title: true,
        responsable: true,
        description: true,
        project: true,
        status: true,
        priority: true,
        startDate: true,
        endDate: true,
        maxResolutionTime: true
    }

    const requiredInputs: TaskInputs = {
        title: false,
        responsable: false,
        description: false,
        project: false,
        status: false,
        priority: false,
        startDate: false,
        endDate: false,
        maxResolutionTime: false
    }

    useEffect(() => {
        if (taskId) {
            fetch(`https://projects-backend-am35.onrender.com/tasks/?ids=${taskId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    return response.json();
                })
                .then(data => {
                    const taskData = data[0];
                    setTask({
                        id: taskData.id,
                        title: taskData.title,
                        description: taskData.description,
                        status: taskData.state,
                        responsable: taskData.assignedEmployee,
                        priority: taskData.priority,
                        startDate: taskData.startDate,
                        finishDate: taskData.finishDate,
                        daysToComplete: taskData.daysToComplete,
                        associatedTickets: taskData.associatedTickets,
                        firstTicketDate: taskData.firstTicketDate,
                        firstTicketId: taskData.firstTicketId,
                    });
                })
                .catch(error => {
                    console.error('Error fetching task:', error);
                    toast.error("Hubo un error al obtener la tarea");
                });
        }
    }, [taskId]);

    
    const [resources, setResources] = useState<Resource[]>([])
    useEffect(() => {
        getResources().then((resources) => setResources(resources)).catch((e) => console.log(e))
    }, [])

    return (
        <div>
            <Breadcrumb steps={[
                { name: "Proyectos", link: "/projects/" },
                { name: "Gestión de Proyectos", link: "/projects/gestionarProyectos" },
                { name: `${projectId}`, link: `/projects/gestionarProyectos/${projectId}` },
                { name: "Tareas del proyecto", link: `/projects/gestionarProyectos/${projectId}/tareas`},
                { name: `#${taskId}`, link: null }
            ]} />
            <div className="space-y-4">
                <header className="flex items-center">
                    <h1 className="text-2xl sm:text-4xl font-bold text-title line-clamp-2 sm:line-clamp-1 py-1">Ver Tarea</h1>
                </header>
                <TaskProjectForm
                    task={task}
                    setTask={setTask}
                    disabledInputs={disabledInputs}
                    requiredInputs={requiredInputs}
                    submitButtonName=""
                    onSubmit={()=>null}
                    onCancel={()=>null}
                    resources={resources.map((resource) => resource.Nombre + " " + resource.Apellido)  
                    }
                    mode={TaskMode.View}
                    />
                   <div className="flex items-center justify-start gap-x-6 px-4">
                <TextButton
                    name="Volver"
                    style="transparent"
                    onClick={() => router.back()}
                />
                </div> 
            </div>
        </div>
    )
}
