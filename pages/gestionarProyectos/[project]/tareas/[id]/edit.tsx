import { useRouter } from 'next/router';
import VersionHeader from '@/components/versionHeader';
import TaskForm, { TaskInputs } from '@/components/form/taskForm';
import Task, { emptyTask } from '@/types/taskProjects';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Breadcrumb from '@/components/breadcrumb';
import Resource from '@/types/resource';
import getResources from '@/services/resourceService';
import TaskProjectForm from '@/components/form/taskProjectForm';
import React from 'react';
import TaskProject from '@/types/taskProjects';


export default function ViewTask() {
    const router = useRouter();
    const { project: projectId, id: taskId } = router.query;
  
    const [task, setTask] = useState<TaskProject>(emptyTask);

    const disabledInputs: TaskInputs = {
        title: false,
        responsable: false,
        description: false,
        project: false,
        status: false,
        priority: false
    }

    const requiredInputs: TaskInputs = {
        title: false,
        responsable: false,
        description: false,
        project: false,
        status: false,
        priority: false
    }

    /*
    useEffect(() => {
        // TODO: API call para conseguir los datos del ticket con id {ticketId}
        setTask(tasksList[taskId as unknown as number - 1])
    }, [])
    */

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
                    console.log(task)
                    console.log(task.responsable)
                })
                .catch(error => {
                    console.error('Error fetching task:', error);
                    toast.error("Hubo un error al obtener la tarea");
                });
        }
    }, [taskId]);

    const onCancel = () => {
        router.push(`/gestionarProyectos/${projectId}/tareas`)
    }

    const onSubmit = () => {
        
        const url = `https://projects-backend-am35.onrender.com/tasks/${task.id}?assigned_employee=${task.responsable}&priority=${task.priority}&state=${task.status}`;

        console.log("la url es:")
        console.log(url)
        fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'accept': '*/*'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
        })
        .then(data => {
            console.log('Success:', data);
            toast.success("Cambios guardados");
            router.push(`/gestionarProyectos/${projectId}/tareas`);
        })
        .catch((error) => {
            console.error('Error:', error);
            console.log('no entiendo, que error');
            toast.error("Hubo un error al guardar los cambios");
        });
    };
    
    const [resources, setResources] = useState<Resource[]>([])
    useEffect(() => {
        getResources().then((resources) => setResources(resources)).catch((e) => console.log("e"))
    }, [])

    return (
        <div>
            <Breadcrumb steps={[
                { name: "Gestión de Proyectos", link: "/gestionarProyectos" },
                { name: `${projectId}`, link: `/gestionarProyectos/${projectId}` },
                { name: "Tareas del proyecto", link: `/gestionarProyectos/${projectId}/tareas`},
                { name: `#${taskId}`, link: null }
            ]} />
            <div className="space-y-4">
                <header className="flex items-center">
                    <h1 className="text-2xl sm:text-4xl font-bold text-title line-clamp-2 sm:line-clamp-1 py-1">Editar tarea</h1>
                </header>
                <TaskProjectForm
                    task={task}
                    setTask={setTask}
                    disabledInputs={disabledInputs}
                    requiredInputs={requiredInputs}
                    submitButtonName="Editar"
                    onSubmit={onSubmit}
                    onCancel={onCancel}
                    resources={resources.map((resource) => resource.Nombre + " " + resource.Apellido)}
                    />
            </div>
        </div>
    )
}
