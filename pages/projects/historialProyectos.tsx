import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";
import ProjectTable from "../../components/compactTable/projects/projectsTable";
import TextButton from "@/components/button/textButton";
import Project from "@/types/project";
import projectsList from "@/components/projectsMock";
import RecordProjectsTable from "@/components/compactTable/projects/recordProjectsTable";
import Breadcrumb from "@/components/breadcrumb";

export default function Projects() {
  const [list, setList] = useState([]);

  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
      // TODO: API call a backend para obtener productos
      setProjects(projectsList)
  }, [])
  

  return (
    <div>
        <Breadcrumb steps={[
            { name: "Proyectos", link: "/projects/" },
            { name: "Historial de Proyectos", link: null } 
        ]} />

        <div className="space-y-4">
            <header className="flex items-center">
                <h1 className="text-2xl sm:text-4xl font-bold text-title line-clamp-2 sm:line-clamp-1 py-1">Historial de Proyectos</h1>
            </header>
            <RecordProjectsTable projects={projectsList} />
            <div className="flex items-center justify-start gap-x-6 px-4">
                <Link href="/projects">
                    <TextButton
                        name="Volver"
                        style="transparent" />
                </Link>
            </div>
        </div>
    </div>
  );
}