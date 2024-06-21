
import { useEffect, useState } from "react";


export default function Projects() {
  const [list, setList] = useState([]);

  useEffect(() => {
    // Aquí podrías añadir lógica para cargar datos si es necesario
  }, []);

  return (

          <h1 className="relative top-7 text-2xl sm:text-4xl font-bold decoration-gray-400 text-gray-900 line-clamp-2 sm:line-clamp-1">
          Creación de proyectos
          </h1>

  );
}