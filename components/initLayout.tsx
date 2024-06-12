import Link from "next/link"
import { useRouter } from "next/router"
import SideBarItem from "./SidebarItem"
import { ISidebarItem } from "./types"
import { Toaster } from "react-hot-toast";

export default function InitLayout({ children }: { children: any }) {

  return (
      <nav className="bg-blue-950">
        <div className="relative flex h-14 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <h1 className="text-white font-bold text-4xl px-2 h-11">PSA</h1>
              <h1 className="text-white font-semibold text-xl h-2 italic">Inicio</h1>
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
