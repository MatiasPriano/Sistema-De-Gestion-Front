import { useRouter } from 'next/router';
import VersionHeader from '@/components/versionHeader';
//import TaskForm, { TaskInputs } from '@/components/form/taskForm';
import Task, { emptyTask } from '@/types/taskProjects';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Breadcrumb from '@/components/breadcrumb';
import Resource from '@/types/resource';
import TaskProjectForm, { TaskInputs, TaskMode } from '@/components/form/taskProjectForm';
import { getEmployees } from '@/services/supportService';

export default function NewTask() {
    const router = useRouter();
    const { project: projectId } = router.query;

    const [task, setTask] = useState<Task>(emptyTask)

    const disabledInputs: TaskInputs = {
        title: false,
        responsable: false,
        description: false,
        project: false,
        status: true,
        priority: false,
        startDate: false,
        endDate: false,
        maxResolutionTime: false
    }

    const requiredInputs: TaskInputs = {
        title: true,
        responsable: false,
        description: true,
        project: false,
        status: false,
        priority: false,
        startDate: false,
        endDate: false,
        maxResolutionTime: false
    }

    const onCancel = () => {
        router.push(`/gestionarProyectos/${projectId}/tareas`)
    }

    const onSubmit = () => {
        const url = `https://projects-backend-am35.onrender.com/projects/${projectId}/tasks/new`;
        const postData = {
            assignedEmployee: task.responsable, // Asumiendo que task.responsable es el ID del empleado
            description: task.description,
            priority: task.priority,
            startDateTime: null,
            state: task.status,
            title: task.title
        };

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            },
            body: JSON.stringify(postData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            toast.success("Tarea creada exitosamente");
            router.push(`/gestionarProyectos/${projectId}/tareas`);
        })
        .catch((error) => {
            console.error('Error:', error);
            toast.error("Hubo un error al crear la tarea");
        });
    };
    
    const [resources, setResources] = useState<Resource[]>([])
    useEffect(() => {
        getEmployees().then((resources) => setResources(resources))
    }, [])

    const [projects, setProjects] = useState<string[]>([])
    useEffect(() => {
        //TODO: API call para obtener los proyectos del back de proyectos
        // setProjects([])
    })

    return (
        <div>
            <Breadcrumb steps={[
                { name: "Gestión de Proyectos", link: "/gestionarProyectos" },
                { name: `${projectId}`, link: `/gestionarProyectos/${projectId}` },
                { name: "Tareas del proyecto", link: `/gestionarProyectos/${projectId}/tareas`},
                { name: "Nueva tarea", link: null }
            ]} />
            <div className="space-y-4">
                <header className="flex items-center">
                    <h1 className="text-2xl sm:text-4xl font-bold text-title line-clamp-2 sm:line-clamp-1 py-1">Crear Tarea</h1>
                </header>
                <TaskProjectForm
                    task={task}
                    setTask={setTask}
                    disabledInputs={disabledInputs}
                    requiredInputs={requiredInputs}
                    submitButtonName="Crear"
                    onSubmit={onSubmit}
                    onCancel={onCancel}
                    resources={resources}
                    mode={TaskMode.New}
                    />
            </div>
        </div>
    )
}
