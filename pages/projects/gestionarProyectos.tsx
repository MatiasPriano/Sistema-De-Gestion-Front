import Breadcrumb from "@/components/breadcrumb";
import TextButton from "@/components/button/textButton";
import ProjectTable from "@/components/compactTable/projects/projectsTable";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function Projects() {
  const router = useRouter();
  const [list, setList] = useState([]);

  useEffect(() => {
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
        // Mapea los datos obtenidos para que coincidan con el formato esperado por ProjectTable
        const projects = data.map(project => ({
          id: project.id,
          name: project.title,
          responsable: project.assignedLeader || 'Sin asignar', // Ajustar según sea necesario
          fechaFinalizacion: project.finishDate ? new Date(project.finishDate).toLocaleDateString() : 'Sin fecha',
          fechaInicio: new Date(project.startDate).toLocaleDateString(),
          estado: project.state,
          descripcion: project.description
        }));
        setList(projects);
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }, []);

  const handleNewProjectButton = () => {
    router.push(`/projects/gestionarProyectos/crearProyecto`);
  }

  return (
    <>
      <Breadcrumb steps={[
        { name: "Proyectos", link: "/projects/" },
        { name: "Gestión de Proyectos", link: null }
      ]} />
      
      <div className="space-y-4">
        <header className="flex items-center">
          <h1 className="text-2xl sm:text-4xl font-bold text-title line-clamp-2 sm:line-clamp-1 py-1">Gestión de Proyectos</h1>
        </header>
        <div className="my-5 flex items-center justify-end gap-x-6 px-4">
          <TextButton name="Crear proyecto" style="secondary" onClick={handleNewProjectButton} />
        </div>
        <ProjectTable projects={list} />
        <div className="flex items-center justify-start gap-x-6 px-4">
          <Link href="/projects">
            <TextButton name="Volver" style="transparent" />
          </Link>
        </div>
      </div>
    </>
  );
}
