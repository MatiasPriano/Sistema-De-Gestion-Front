import Link from "next/link"
import { useRouter } from "next/router"
import SideBarItem from "./SidebarItem"
import { ISidebarItem } from "./types"

export default function Layout({ children }: { children: any }) {

  return (
    <nav className="bg-blue-950">
      <div className="relative flex h-14 items-center justify-between">
        <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan">
            <span className="absolute -inset-0.5"></span>
            <span className="sr-only">Abrir menu principal</span>

            <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>

            <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>

        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div className="flex flex-shrink-0 items-center">
            <h1 className="text-white font-bold text-4xl px-2 h-11">PSA</h1>
            <h1 className="text-white font-semibold text-xl h-2 italic">Soporte</h1>
          </div>

          <div className="hidden sm:ml-8 sm:block">
            <div className="flex space-x-4">
              <Link href="/" className="bg-black hover:bg-blue-900 text-white rounded-md px-3 py-2 font-medium">Inicio</Link>
              <Link href="/products" className="bg-blue-950 hover:bg-blue-900 text-white rounded-md px-3 py-2 font-medium">Productos</Link>
              <Link href="/tickets" className="bg-blue-950 hover:bg-blue-900 text-white rounded-md px-3 py-2 font-medium">Tickets</Link>
            </div>
          </div>
        </div>  
      </div>

      <div className="min-h-screen flex flex-col bg-white">
          <div className="">
            <main className="flex-1">{children}</main>
          </div>
      </div>
    </nav>  
  )
}
