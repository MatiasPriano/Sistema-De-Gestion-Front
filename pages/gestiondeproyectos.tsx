
import { useEffect, useState } from "react";


// Asegúrate de importar el componente Breadcrumb
import Breadcrumb from "../components/Breadcrumb"; // Ajusta la ruta según la ubicación de tu componente

function HeaderItem({ title }) {
  return <th className="px-6 py-3 text-sm text-left text-gray-500 border-b border-gray-200 bg-gray-50">{title}</th>
}

export default function Projects() {
  const [list, setList] = useState([]);

  useEffect(() => {
    // Aquí podrías añadir lógica para cargar datos si es necesario
  }, []);

  return (
    
        
          <h1 className="relative top-7 text-2xl sm:text-4xl font-bold decoration-gray-400 text-gray-900 line-clamp-2 sm:line-clamp-1">
            Gestión de proyectos
          </h1>
       
    
  );
}
