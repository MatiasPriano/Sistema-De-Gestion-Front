import Image from "next/image"
import { Inter } from "next/font/google"
import Link from "next/link"
import InitLayout from "@/components/initLayout"
import { useRouter } from "next/router"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {

  // const router = useRouter();

  // const redirectToSupportModule = () => {
  //   router.push(`/products`)
  // }

  return (
        <div className="container max-w-7xl mx-auto mt-8 justify-center">
        <div className="flex justify-center py-5">
          <div className="bg-gray-50 max-w-sm p-6 border border-gray-200 rounded-lg shadow dark:bg-gray-800 
            dark:border-gray-700 w-full m-5 h-52">
              
            <div className="flex items-center">  
              <img src="https://img.icons8.com/?size=100&id=yd2bKxyGJGuU&format=png&color=000000" className="w-10 h-10"></img>                  
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white p-2">Proyectos</h5>
            </div>
            
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Módulo para la gestión de proyectos y tareas</p>
              <br/>
              <Link href="/projects" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Ingresar al módulo
              </Link>
              
          </div>

          <div className="bg-gray-50 max-w-sm p-6 border border-gray-200 rounded-lg shadow dark:bg-gray-800 
            dark:border-gray-700 w-full m-5 h-52">

            <div className="flex items-center">
              <img src="https://img.icons8.com/?size=100&id=11683&format=png&color=000000" className="w-8 h-8"></img> 
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white p-2">Soporte</h5>
            </div>
            
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Módulo para la gestión de tickets</p>
              <br/>
              {/* <button type="button" onClick={redirectToSupportModule}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg 
                      hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 
                      dark:focus:ring-blue-800">
                      Ingresar al módulo
              </button> */}
              <Link href="/products" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Ingresar al módulo
              </Link>
          </div>
        </div>
      </div>
  )
}
