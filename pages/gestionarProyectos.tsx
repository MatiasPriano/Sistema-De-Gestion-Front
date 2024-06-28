import Breadcrumb from "@/components/breadcrumb";
import TextButton from "@/components/button/textButton";
import ProjectTable from "@/components/compactTable/projects/projectsTable";
import Loading from "@/components/loader";
import { getEmployees } from "@/services/supportService";
import Employee from "@/types/employee";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function Projects() {
  const router = useRouter();
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [resources, setResources] = useState<Employee[]>([]);

  useEffect(() => {
    const resourcePromise = getEmployees();
    const projectsPromise = fetch("https://projects-backend-am35.onrender.com/projects", {
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
      Promise.all([resourcePromise, projectsPromise]).then(([resources, data]) => {
        // Mapea los datos obtenidos para que coincidan con el formato esperado por ProjectTable
        const projects = data.map((project:any) => {
          let leaderName = null;
          if(project.assignedLeader){

          let  leader = resources.filter((resource)=>resource.legajo === project.assignedLeader)[0]
          leaderName = leader.Nombre + " " + leader.Apellido;

          }else{
            leaderName = "Sin asignar" 
          }
          return{
            id: project.id,
            name: project.title,
            responsable: leaderName,
            fechaFinalizacion: project.finishDate ? new Date(project.finishDate).toLocaleDateString() : 'Sin fecha',
            fechaInicio: new Date(project.startDate).toLocaleDateString(),
            estado: project.state,
            descripcion: project.description
        }});
        setList(projects);
        setIsLoading(false);
        console.log(projects)
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }, []);

  const handleNewProjectButton = () => {
    router.push(`/gestionarProyectos/crearProyecto`);
  }

  return (
    <>
      {!isLoading && <Breadcrumb steps={[
        { name: "Gestión de Proyectos", link: null }
      ]} />}
      
      <div className="space-y-4">
        <header className="flex items-center">
          <h1 className="text-2xl sm:text-4xl font-bold text-title line-clamp-2 sm:line-clamp-1 py-1">Gestión de Proyectos</h1>
        </header>
        {!isLoading && <div className="my-5 flex items-center justify-end gap-x-6 px-4">
          <TextButton name="Crear proyecto" style="secondary" onClick={handleNewProjectButton} />
        </div>}
        {!isLoading && <ProjectTable projects={list} />}
        {isLoading && <Loading data="Proyectos"/>}
        <div className="flex items-center justify-start gap-x-6 px-4">
          <Link href="/home">
            <TextButton name="Volver" style="transparent" />
          </Link>
        </div>
      </div>
    </>
  );
}
