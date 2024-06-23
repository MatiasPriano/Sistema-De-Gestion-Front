import { useRouter } from 'next/router';
import VersionHeader from '@/components/versionHeader';
import TaskForm, { TaskInputs } from '@/components/form/taskForm';
import Task, { emptyTask } from '@/types/task';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Breadcrumb from '@/components/breadcrumb';
import Employee from '@/types/employee';

export default function NewTask() {
    const router = useRouter();
    const { product, version, id } = router.query;

    const [task, setTask] = useState<Task>(emptyTask)

    const disabledInputs: TaskInputs = {
        title: false,
        responsable: false,
        description: false,
        project: false,
        status: false,
        priority: false
    }

    const requiredInputs: TaskInputs = {
        title: true,
        responsable: false,
        description: true,
        project: true,
        status: true,
        priority: true
    }

    const onCancel = () => {
        router.push(`/products/${product}/${version}/${id}/tasks`)
    }

    const onSubmit = () => {
        // TODO: API call a backend para crear tarea y asociarla a ticket
        toast.success("Tarea creada")
        router.push(`/products/${product}/${version}/${id}/tasks`)
    }
    
    const [resources, setResources] = useState<Employee[]>([])
    useEffect(() => {
        // getResources().then((resources) => setResources(resources)).catch((e) => console.log(e))
    }, [])

    const [projects, setProjects] = useState<string[]>([])
    useEffect(() => {
        //TODO: API call para obtener los proyectos del back de proyectos

        //Comento esta linea porque rompe con el ruteo
        // setProjects([]) 
    })

    return (
        <div>
            <Breadcrumb steps={[
                { name: "Productos", link: `/products/` },
                { name: `${product} - ${version}`, link: `/products/${product}/${version}/` },
                { name: `#${id}`, link: `/products/${product}/${version}/${id}` },
                { name: "Tareas asociadas", link: `/products/${product}/${version}/${id}/tasks/` },
                { name: "Nueva tarea", link: null }
            ]} />
            <VersionHeader  productId={product as string}
                            versionId={version as string}
                            ticketId={id as string}
                            title="Nueva tarea asociada al ticket"
            />
            <TaskForm
                task={task}
                setTask={setTask}
                disabledInputs={disabledInputs}
                requiredInputs={requiredInputs}
                submitButtonName="Crear"
                onSubmit={onSubmit}
                onCancel={onCancel}
                resources={resources.map((resource) => resource.Nombre + " " + resource.Apellido)}
                projects={projects} />
        </div>
    )
}
