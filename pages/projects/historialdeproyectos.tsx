import Link from "next/link";
import React from "react";
import { useEffect, useState } from "react";
import ProjectTable from "../../components/compactTable/projects/projectsTable";
import TextButton from "@/components/button/textButton"

// Asegúrate de importar el componente Breadcrumb

function HeaderItem({ title }) {
  return <th className="px-6 py-3 text-sm text-left text-gray-500 border-b border-gray-200 bg-gray-50">{title}</th>
}

export default function Projects() {
  const [list, setList] = useState([]);

  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
      // TODO: API call a backend para obtener productos
      setProjects(projectsList)
  }, [])
  

  return (
    
     
      
    <div className="space-y-4">
    <header className="flex items-center">
        <h1 className="text-2xl sm:text-4xl font-bold text-title line-clamp-2 sm:line-clamp-1">Productos</h1>
    </header>
    <ProjectTable projects={projectsList} />
    <div className="flex items-center justify-start gap-x-6 px-4">
        <Link href="/home">
            <TextButton
                name="Volver"
                style="transparent" />
                </Link>
            </div>
        </div>

        
    
  );
}