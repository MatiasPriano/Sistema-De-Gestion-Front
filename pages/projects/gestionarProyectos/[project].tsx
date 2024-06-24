import Breadcrumb from "@/components/breadcrumb";
import TextButton from "@/components/button/textButton";
import ProjectForm, { ProjectInputs } from "@/components/form/projectForm";
//import projectsList from "@/components/projectsMock";
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
        description: false,
        responsable: false,
        state: false,
        endDateTime: false
    }

    const [project, setProject] = useState(emptyProject)


    
    useEffect(() => {
        if (projectId) {
            fetch("https://projects-backend-am35.onrender.com/projects", {
                method: "GET",
                headers: {
                    "Accept": "*/*"
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Error al obtener la lista de proyectos");
            })
            .then(data => {
                // Mapea los datos obtenidos para que coincidan con el formato esperado
                const projects = data.map(project => ({
                    id: project.id,
                    name: project.title,
                    responsable: project.assignedLeader || 'Sin asignar', // Ajustar según sea necesario
                    fechaFinalizacion: project.finishDate ? new Date(project.finishDate).toLocaleDateString() : 'Sin fecha',
                    fechaInicio: new Date(project.startDate).toLocaleDateString(),
                    estado: project.state,
                    descripcion: project.description
                }));

                const currentProject = projects.find(proj => proj.id === Number(projectId));
                if (currentProject) {
                    setProject(currentProject);
                } else {
                    console.error("Project not found");
                }
            })
            .catch(error => {
                console.error("Error:", error);
            });
        }
    }, [projectId]);


    const [resources, setResources] = useState<Resource[]>([])
    useEffect(() => {
        getResources().then((resources) => setResources(resources)).catch((e) => console.log(e))
    }, [])

    const onCancel = () => {
        router.back()
    }

    const onSubmit = () => {
        
        console.log("datos del proyecto");
        console.log(project.id);
        console.log(project.name);
        console.log(project.descripcion);
        console.log(project.estado);
        console.log(project.fechaInicio);
        console.log(project.fechaFinalizacion);
        console.log(project.responsable);
    
        const url = `https://projects-backend-am35.onrender.com/projects/${project.id}?assigned_leader=${project.responsable}&description=${project.descripcion}&state=${project.estado}&title=${project.name}`;
    
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
            // Check if response is not empty before parsing
            return response.text().then(text => {
                return text ? JSON.parse(text) : {};
            });
        })
        .then(data => {
            console.log('Success:', data);
            toast.success("Cambios guardados");
            router.push(`/projects/gestionarProyectos`);
        })
        .catch((error) => {
            console.error('Error:', error);
            toast.error("Hubo un error al guardar los cambios");
        });
    };
    

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