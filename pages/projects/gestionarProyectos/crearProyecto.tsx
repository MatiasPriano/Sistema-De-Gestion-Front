import Breadcrumb from "@/components/breadcrumb";
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
      state: true,
      endDateTime: true
  } 

  const [project, setProject] = useState(emptyProject)

  const onSubmit = () => {
      // TODO: API call a backend para crear ticket y obtener el id del ticket
      const ticketId = 1
      toast.success("Proyecto creado")
      router.push(`/products/gestionarProyectos`)
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
        <ProjectForm
                project={project}
                setProject={setProject}
                disabledInputs={disabledInputs}
                requiredInputs={requiredInputs}
                onCancel={() => router.back()}
                resources={resources.map((resource) => resource.Nombre + " " + resource.Apellido)}
                submitButtonName="Crear"
                onSubmit={onSubmit} />
      </div>

  );
}