import { useRouter } from 'next/router';
import VersionHeader from '@/components/versionHeader';
import TaskForm, { TaskInputs } from '@/components/form/taskForm';
import Task from '@/types/task';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function NewTask() {
    const router = useRouter();
    const { product, version, id } = router.query;

    const initialTask: Task = {
        id: 1,
        title: "",
        responsable: "",
        description: "",
        project: "",
        status: "Abierta",
        priority: "Baja",
    }

    const [task, setTask] = useState<Task>(initialTask)

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
    const resources: string[] = []
    const projects: string[] = []

    const onCancel = () => {
        router.push(`/products/${product}/${version}/${id}/tasks/`)
    }

    const onSubmit = () => {
        // TODO: API call a backend para crear tarea y asociarla a ticket
        toast.success("Tarea creada")
        router.push(`/products/${product}/${version}/${id}/tasks/`)
    }

    return (
        <div>
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
                resources={resources}
                projects={projects} />
        </div>
    )
}
