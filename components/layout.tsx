import Link from "next/link"
import { Toaster } from "react-hot-toast";

export default function Layout({ children, pageTitle }: { children: any, pageTitle: any }) {

  return (
    <nav>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div className="fixed top-0 left-0 w-full bg-primary z-[9999]">
        <div className="relative flex h-14 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">    
              <Link href="/home" className="flex flex-shrink-0 items-center">
                <h1 className="text-darkTitle font-bold text-4xl px-2 h-11">PSA</h1>
                <h1 className="text-darkTitle font-semibold text-xl h-2 italic">{pageTitle}</h1>
              </Link>   
            

            <div className="hidden sm:ml-8 sm:block">
              <div className="flex space-x-4">
                <Link href="/projects" className="bg-primary hover:bg-primaryHover text-darkTitle rounded-md px-3 py-2 font-medium transition-colors duration-300 ease-in-out">Proyectos</Link>
                <Link href="/products" className="bg-primary hover:bg-primaryHover text-darkTitle rounded-md px-3 py-2 font-medium transition-colors duration-300 ease-in-out">Soporte</Link>
              </div>
            </div>
          </div>  
        </div>
      </div>

      <div className="min-h-screen flex flex-col bg-transparent">
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
