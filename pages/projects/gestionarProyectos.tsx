
import Breadcrumb from "@/components/breadcrumb";
import TextButton from "@/components/button/textButton";
import ProjectTable from "@/components/compactTable/projects/projectsTable";
import projectsList from "@/components/projectsMock";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";


export default function Projects() {
  const router = useRouter();
  const [list, setList] = useState([]);

  useEffect(() => {
    // Aquí podrías añadir lógica para cargar datos si es necesario
  }, []);


  const handleNewProjectButton = () => {
      router.push(`/projects/gestionarProyectos/crearProyecto`)
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
                <ProjectTable projects={projectsList} />
                <div className="flex items-center justify-start gap-x-6 px-4">
                    <Link href="/projects">
                        <TextButton
                            name="Volver"
                            style="transparent" />
                    </Link>
                </div>
            </div>
        </>
  );
}
