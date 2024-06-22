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

    const handleProjectManagementClick = () => {
		router.push("/projects/gestionarProyectos")
	}

    const handleProjectRecordClick = () => {
		router.push("/projects/historialdeproyectos")
	}

    return (
    <>
        <Breadcrumb steps={[
            { name: "Proyectos", link: null }
        ]} />

      <div className="flex flex-col sm:flex-row items-center justify-center py-5">  
      <div className="bg-backgroundAccent max-w-sm p-6 border border-border hover:shadow-lg rounded-lg shadow w-full m-5 h-52 w-80">
				<div className="flex items-center">  
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-7 w-7 text-title">
						<path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
					</svg>
					<h5 className="text-xl sm:text-2xl font-bold tracking-tight text-textColor p-2 text-title">Gestión de proyectos</h5>
				</div>
				<p className="mb-3 font-normal text-subtitle">Creación y gestión de proyectos y tareas</p>
				<br/>
				<TextButton
					name="Ingresar al módulo"
					style="primary"
					onClick={handleProjectManagementClick} />
			</div>

            <div className="bg-backgroundAccent max-w-sm p-6 border border-border hover:shadow-lg rounded-lg shadow w-full m-5 h-52 w-80">
				<div className="flex items-center">  
					<svg className="h-7 w-7 text-title" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>history-list</title> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="icon" fill="#000000" transform="translate(33.830111, 42.666667)"> <path d="M456.836556,405.333333 L456.836556,448 L350.169889,448 L350.169889,405.333333 L456.836556,405.333333 Z M328.836556,405.333333 L328.836556,448 L286.169889,448 L286.169889,405.333333 L328.836556,405.333333 Z M456.836556,341.333333 L456.836556,384 L350.169889,384 L350.169889,341.333333 L456.836556,341.333333 Z M328.836556,341.333333 L328.836556,384 L286.169889,384 L286.169889,341.333333 L328.836556,341.333333 Z M131.660221,261.176335 C154.823665,284.339779 186.823665,298.666667 222.169889,298.666667 C237.130689,298.666667 251.492003,296.099965 264.837506,291.382887 L264.838264,335.956148 C251.200633,339.466383 236.903286,341.333333 222.169889,341.333333 C175.041086,341.333333 132.37401,322.230407 101.489339,291.345231 L131.660221,261.176335 Z M456.836556,277.333333 L456.836556,320 L350.169889,320 L350.169889,277.333333 L456.836556,277.333333 Z M328.836556,277.333333 L328.836556,320 L286.169889,320 L286.169889,277.333333 L328.836556,277.333333 Z M222.169889,7.10542736e-15 C316.426487,7.10542736e-15 392.836556,76.4100694 392.836556,170.666667 C392.836556,201.752854 384.525389,230.897864 370.003903,256.000851 L317.574603,256.00279 C337.844458,233.356846 350.169889,203.451136 350.169889,170.666667 C350.169889,99.9742187 292.862337,42.6666667 222.169889,42.6666667 C151.477441,42.6666667 94.1698893,99.9742187 94.1698893,170.666667 C94.1698893,174.692297 94.3557269,178.674522 94.7192911,182.605232 L115.503223,161.830111 L145.673112,192 L72.836556,264.836556 L4.97379915e-14,192 L30.1698893,161.830111 L51.989071,183.641815 C51.6671112,179.358922 51.5032227,175.031933 51.5032227,170.666667 C51.5032227,76.4100694 127.913292,7.10542736e-15 222.169889,7.10542736e-15 Z M243.503223,64 L243.503223,159.146667 L297.903223,195.626667 L274.436556,231.04 L200.836556,182.186667 L200.836556,64 L243.503223,64 Z" id="Combined-Shape"> </path> </g> </g> </g></svg>
					<h5 className="text-xl sm:text-2xl font-bold tracking-tight text-textColor p-2 text-title">Historial de proyectos</h5>
				</div>
				<p className="mb-3 font-normal text-subtitle">Consultar los proyectos que fueron archivados</p>
				<br/>
				<TextButton
					name="Ingresar al módulo"
					style="primary"
					onClick={handleProjectRecordClick} />
			</div>
        </div>
    </>
    )
}

