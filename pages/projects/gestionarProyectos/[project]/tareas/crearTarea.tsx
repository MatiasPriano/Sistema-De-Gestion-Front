import { useRouter } from 'next/router';
import VersionHeader from '@/components/versionHeader';
//import TaskForm, { TaskInputs } from '@/components/form/taskForm';
import Task, { emptyTask } from '@/types/taskProjects';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Breadcrumb from '@/components/breadcrumb';
import Resource from '@/types/resource';
import getResources from '@/services/resourceService';
import TaskProjectForm, { TaskInputs } from '@/components/form/taskProjectForm';

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

    const onCancel = () => {
        router.push(`/projects/gestionarProyectos/${projectId}/tareas`)
    }

    const onSubmit = () => {
        // TODO: API call a backend para crear tarea y asociarla a ticket
        toast.success("Tarea creada")
        router.push(`/projects/gestionarProyectos/${projectId}/tareas`)
    }
    
    const [resources, setResources] = useState<Resource[]>([])
    useEffect(() => {
        getResources().then((resources) => setResources(resources)).catch((e) => console.log(e))
    }, [])

    const [projects, setProjects] = useState<string[]>([])
    useEffect(() => {
        //TODO: API call para obtener los proyectos del back de proyectos
        // setProjects([])
    })

    return (
        <div>
            <Breadcrumb steps={[
                { name: "Proyectos", link: "/projects/" },
                { name: "Gestión de Proyectos", link: "/projects/gestionarProyectos" },
                { name: `${projectId}`, link: `/projects/gestionarProyectos/${projectId}` },
                { name: "Tareas del proyecto", link: `/projects/gestionarProyectos/${projectId}/tareas`},
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
                    resources={resources.map((resource) => resource.Nombre + " " + resource.Apellido)}
                    />
            </div>
        </div>
    )
}
