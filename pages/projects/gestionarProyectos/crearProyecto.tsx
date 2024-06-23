import Breadcrumb from "@/components/breadcrumb";
import TextButton from "@/components/button/textButton";
import ProjectForm, { ProjectInputs } from "@/components/form/projectForm";
import getResources from "@/services/resourceService";
import { emptyProject } from "@/types/project";
import Resource from "@/types/resource";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


export default function NewProject() {
  const router = useRouter();
  
  const disabledInputs: ProjectInputs = {
      name: false,
      description: false,
      responsable: false,
      state: true,
      endDateTime: false
  }

  const requiredInputs: ProjectInputs = {
      name: true,
      description: true,
      responsable: false,
      state: false,
      endDateTime: false
  } 

  const [project, setProject] = useState(emptyProject)

  const onCancel = () => {
    router.back()
}

  const onSubmit = () => {
      // TODO: API call a backend para crear ticket y obtener el id del ticket
      const ticketId = 1
      toast.success("Proyecto creado")
      router.push(`/projects/gestionarProyectos`)
  }

  const [resources, setResources] = useState<Resource[]>([])
  useEffect(() => {
      getResources().then((resources) => setResources(resources)).catch((e) => console.log(e))
  }, [])

  return (
      <div>
        <Breadcrumb steps={[
                { name: "Proyectos", link: "/projects/" },
                { name: "Gestión de Proyectos", link: "/projects/gestionarProyectos" },
                { name: "Nuevo proyecto", link: null }
            ]} />
        <div className="space-y-4">
                <header className="flex items-center">
                  <h1 className="text-2xl sm:text-4xl font-bold text-title line-clamp-2 sm:line-clamp-1 py-1">Crear Proyecto</h1>
                </header>
            <ProjectForm
                    project={project}
                    setProject={setProject}
                    disabledInputs={disabledInputs}
                    requiredInputs={requiredInputs}
                    submitButtonName="Crear"
                    onSubmit={onSubmit}
                    onCancel={onCancel}
                    resources={resources.map((resource) => resource.Nombre + " " + resource.Apellido)}
                     />
            </div>
      </div>

  );
}