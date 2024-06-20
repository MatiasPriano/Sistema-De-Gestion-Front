import Link from "next/link"
import { Toaster } from "react-hot-toast";
import { useState } from "react";

export default function Layout({ children, pageTitle }: { children: any, pageTitle: any }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav>
      <div className="fixed top-0 left-0 w-full bg-blue-950 z-[9999]">
        <div className="relative flex h-14 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">    
              <Link href="/home" className="flex flex-shrink-0 items-center">
                <h1 className="text-white font-bold text-4xl px-2 h-11">PSA</h1>
                <h1 className="text-white font-semibold text-xl h-2 italic">{pageTitle}</h1>
              </Link>   
            

            <div className="hidden sm:ml-8 sm:block">
              <div className="flex space-x-4">
                <div className="relative group"
                onMouseEnter={() => setIsMenuOpen(true)}
                onMouseLeave={() => setIsMenuOpen(false)}
                >
                  <Link href="/projects" className="relative top-2 bg-blue-950 hover:bg-blue-900 text-white rounded-md px-3 py-2 font-medium">Proyectos</Link>
                  <div className="fixed top-9 absolute hidden group-hover:block bg-blue-950 text-white rounded-md mt-1 w-48">
                    <Link href="gestiondeproyectos" className="block px-4 py-2 hover:bg-blue-900">Gestion de proyectos</Link>
                    <Link href="historialdeproyectos" className="block px-4 py-2 hover:bg-blue-900">Historial de proyectos</Link>
                    <Link href="creaciondeproyectos" className="block px-4 py-2 hover:bg-blue-900">Creación de proyectos</Link>
                  </div>
                </div>
                  <Link href="/products" className="bg-blue-950 hover:bg-blue-900 text-white rounded-md px-3 py-2 font-medium">Soporte</Link>
              </div>
            </div>
          </div>  
        </div>
      </div>

      <div className="min-h-screen flex flex-col bg-white">
          <div className="p-6 pt-20">
            <main className="flex-1">
              <Toaster position="bottom-center" />
              {children}
              </main>
          </div>
      </div>
    </nav>  
  )
}
