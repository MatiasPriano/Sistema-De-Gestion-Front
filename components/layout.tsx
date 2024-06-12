import Link from "next/link"
import { Toaster } from "react-hot-toast";

export default function Layout({ children, pageTitle }: { children: any, pageTitle: any }) {

  return (
    <nav className="bg-blue-950">
      <div className="relative flex h-14 items-center justify-between">
        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          
            <Link href="/home" className="flex flex-shrink-0 items-center">
              <h1 className="text-white font-bold text-4xl px-2 h-11">PSA</h1>
              <h1 className="text-white font-semibold text-xl h-2 italic">{pageTitle}</h1>
            </Link>   
          

          <div className="hidden sm:ml-8 sm:block">
            <div className="flex space-x-4">
              <Link href="/projects" className="bg-blue-950 hover:bg-blue-900 text-white rounded-md px-3 py-2 font-medium">Proyectos</Link>
              <Link href="/products" className="bg-blue-950 hover:bg-blue-900 text-white rounded-md px-3 py-2 font-medium">Soporte</Link>
            </div>
          </div>
        </div>  
      </div>

      <div className="min-h-screen flex flex-col bg-white">
          <div className="">
            <main className="flex-1">
              <Toaster position="bottom-center" />
              {children}
              </main>
          </div>
      </div>
    </nav>  
  )
}
