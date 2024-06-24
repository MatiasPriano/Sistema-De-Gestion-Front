import { useRouter } from 'next/router';
import VersionHeader from '@/components/versionHeader';
import NewTaskForm, { TaskInputs } from '@/components/form/newTaskForm';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Breadcrumb from '@/components/breadcrumb';
import Employee from '@/types/employee';
import { Project } from '@/types/project';
import { associateTasks, createTask, getEmployees, getProjects, getVersion } from '@/services/supportService';
import { NewTask, emptyNewTask } from '@/types/newTask';
import Loading from '@/components/loader';

export default function NewTaskComponent() {
  const router = useRouter();
  const { product: productId, version: versionId, id: ticketId } = router.query;

  const [newTask, setNewTask] = useState<NewTask>(emptyNewTask);

  const disabledInputs: TaskInputs = {
    title: false,
    responsable: false,
    description: false,
    project: false,
    state: false,
    priority: false,
  };

    const requiredInputs: TaskInputs = {
        title: true,
        responsable: false,
        description: true,
        project: true,
        state: true,
        priority: true
    }

    const [employees, setEmployees] = useState<Employee[]>([])
    const [projects, setProjects] = useState<Project[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [versionName, setVersionName] = useState<string>("")
    const [productName, setProductName] = useState<string>("")
    useEffect(() => {
        let employeePromise = getEmployees()
        let projectsPromise = getProjects()
        let versionPromise = getVersion(Number(versionId))
        Promise.all([employeePromise, projectsPromise, versionPromise]).then(([employees, projects, version]) => {
            setEmployees(employees)
            setProjects(projects)
            setProductName(version.product.name)
            setVersionName(version.name)
            setIsLoading(false)
        })
    }, [])

    const onCancel = () => {
        router.push(`/versions/${productId}/${versionId}/${ticketId}/tasks`)
    }

    const onSubmit = () => {
        console.log("Tarea: ", newTask)
        createTask(newTask).then((wasCreated: boolean) => {
            if (wasCreated) {
                associateTasks(Number(ticketId), [newTask.id]).then((wasLinked) => {
                    if (wasLinked) {
                        toast.success("Tarea creada")
                        router.push(`/versions/${productId}/${versionId}/${ticketId}/tasks`)
                    } else {
                        toast.error("Hubo un problema al asociar la tarea al ticket")
                    }
                })
            } else {
                toast.error("Hubo un problema al crear la tarea")
            }
        })
    }

    return (
        <div>
            {!isLoading && <Breadcrumb steps={[
                { name: "Productos", link: `/versions/` },
                { name: `${productName} - ${versionName}`, link: `/versions/${productId}/${versionId}/` },
                { name: `#${ticketId}`, link: `/versions/${productId}/${versionId}/${ticketId}` },
                { name: "Tareas asociadas", link: `/versions/${productId}/${versionId}/${ticketId}/tasks/` },
                { name: "Nueva tarea", link: null }
            ]} />}
            {!isLoading && <VersionHeader productId={productName}
                            versionId={versionName}
                            ticketId={ticketId as string}
                            title="Nueva tarea asociada al ticket" />}
            {!isLoading && <NewTaskForm
                newTask={newTask}
                setNewTask={setNewTask}
                disabledInputs={disabledInputs}
                requiredInputs={requiredInputs}
                submitButtonName="Crear"
                onSubmit={onSubmit}
                onCancel={onCancel}
                employees={employees}
                projects={projects} />}
            {isLoading && <Loading data="tarea"/>}
        </div>
    )
}
