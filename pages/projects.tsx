import {useEffect, useState} from "react";
import productsList from "@/components/productsMock";
import Breadcrumb from "@/components/breadcrumb";
import ProductTable from "@/components/compactTable/products/productTable";
import Product from "@/types/product";
import TextButton from "@/components/button/textButton"
import { useRouter } from "next/router"

export default function Products() {
    const [products, setProducts] = useState<Product[]>([])

    const router = useRouter()

    useEffect(() => {
        // TODO: API call a backend para obtener productos
        setProducts(productsList)
    }, [])

    const handleProjectButtonClick = () => {
		router.push("/projects/creaciondeproyectos")
	}
    const handleProjectButtonClick2 = () => {
		router.push("/projects/gestiondeproyectos")
	}
    const handleProjectButtonClick3 = () => {
		router.push("/projects/historialdeproyectos")
	}

    return (
    <>
        <Breadcrumb steps={[
            { name: "Productos", link: null }
			
			
        ]} />
      <div className="flex flex-col sm:flex-row items-center justify-center py-5">  
      <div className="bg-backgroundAccent max-w-sm p-6 border border-border hover:shadow-lg rounded-lg shadow w-full m-5 h-52 w-80">
				<div className="flex items-center">  
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-7 w-7 text-title">
						<path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
					</svg>
					<h5 className="text-xl sm:text-2xl font-bold tracking-tight text-textColor p-2 text-title">Gestión de proyectos</h5>
				</div>
				<p className="mb-3 font-normal text-subtitle">Módulo para la gestión de proyectos y tareas</p>
				<br/>
				<TextButton
					name="Ingresar al módulo"
					style="primary"
					onClick={handleProjectButtonClick2} />
			</div>


            <div className="bg-backgroundAccent max-w-sm p-6 border border-border hover:shadow-lg rounded-lg shadow w-full m-5 h-52 w-80">
				<div className="flex items-center">  
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-7 w-7 text-title">
						<path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
					</svg>
					<h5 className="text-xl sm:text-2xl font-bold tracking-tight text-textColor p-2 text-title">Creación de proyectos</h5>
				</div>
				<p className="mb-3 font-normal text-subtitle">Módulo para la creación de proyectos</p>
				<br/>
				<TextButton
					name="Ingresar al módulo"
					style="primary"
					onClick={handleProjectButtonClick} />
			</div>

            <div className="bg-backgroundAccent max-w-sm p-6 border border-border hover:shadow-lg rounded-lg shadow w-full m-5 h-52 w-80">
				<div className="flex items-center">  
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-7 w-7 text-title">
						<path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
					</svg>
					<h5 className="text-xl sm:text-2xl font-bold tracking-tight text-textColor p-2 text-title">Historial de proyectos</h5>
				</div>
				<p className="mb-3 font-normal text-subtitle">Módulo de historial de proyectos y tareas</p>
				<br/>
				<TextButton
					name="Ingresar al módulo"
					style="primary"
					onClick={handleProjectButtonClick3} />
			</div>
        </div>
    </>
    )
}

