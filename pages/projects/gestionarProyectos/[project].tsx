import Breadcrumb from "@/components/breadcrumb";
import TextButton from "@/components/button/textButton";
import ProjectForm, { ProjectInputs } from "@/components/form/projectForm";
import projectsList from "@/components/projectsMock";
import getResources from "@/services/resourceService";
import { emptyProject } from "@/types/project";
import Resource from "@/types/resource";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ManageProject() {
    const router = useRouter();
    const { project: projectId } = router.query;

    const disabledInputs: ProjectInputs = {
        name: true,
        description: false,
        responsable: false,
        state: false,
        endDateTime: false
    }

    const requiredInputs: ProjectInputs = {
        name: true,
        description: true,
        responsable: false,
        state: true,
        endDateTime: true
    }

    const [project, setProject] = useState(emptyProject)
    useEffect(() => {
        // TODO: API call para obtener detalles del ticket
        console.log(projectId)
        setProject(projectsList[projectId as unknown as number - 1])
    }, [])

    const [resources, setResources] = useState<Resource[]>([])
    useEffect(() => {
        getResources().then((resources) => setResources(resources)).catch((e) => console.log(e))
    }, [])

    const onCancel = () => {
        router.back()
    }

    const onSubmit = () => {
        // TODO: API call a backend para editar ticket
        toast.success("Cambios guardados")
        router.push(`/projects/gestionarProyectos`)
    }

    return (
        <div>
            <Breadcrumb steps={[
                { name: "Proyectos", link: "/projects/" },
                { name: "Gestión de Proyectos", link: "/projects/gestionarProyectos" },
                { name: `${projectId}`, link: null }
            ]} />
            <div className="space-y-4">
                <header className="flex items-center">
                  <h1 className="text-2xl sm:text-4xl font-bold text-title line-clamp-2 sm:line-clamp-1 py-1">Gestionar Proyecto</h1>
                </header>
                <ProjectForm
                    project={project}
                    setProject={setProject}
                    disabledInputs={disabledInputs}
                    requiredInputs={requiredInputs}
                    submitButtonName={'Guardar cambios'}
                    onSubmit={onSubmit}
                    onCancel={onCancel}
                    resources={resources.map((resource) => resource.Nombre + " " + resource.Apellido)}
                    />
                <div className="flex items-center justify-start gap-x-6 px-4">
                    <TextButton
                        name="Volver"
                        style="transparent"
                        onClick={() => router.back()} />
                </div>
            </div>
        </div>
    )
}