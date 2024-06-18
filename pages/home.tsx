import TextButton from "@/components/button/textButton"
import { Inter } from "next/font/google"
import Link from "next/link"
import { useRouter } from "next/router"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
	const router = useRouter()

	const handleProjectButtonClick = () => {
		router.push("/projects")
	}

	const handleSupportButtonClick = () => {
		router.push("/products")
	}

    return (
		<div className="flex flex-col sm:flex-row items-center justify-center py-5">
			<div className="bg-gray-50 max-w-sm p-6 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-full m-5 h-52 w-80">
				<div className="flex items-center">  
					<img src="https://img.icons8.com/?size=100&id=yd2bKxyGJGuU&format=png&color=000000" className="w-6 sm:w-10 h-6 sm:h-10" />                  
					<h5 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white p-2">Proyectos</h5>
				</div>
				<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Módulo para la gestión de proyectos y tareas</p>
				<br/>
				<TextButton
					name="Ingresar al módulo"
					style="primary"
					onClick={handleProjectButtonClick} />
			</div>

			<div className="bg-gray-50 max-w-sm p-6 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-full m-5 h-52 w-80">
				<div className="flex items-center">
					<img src="https://img.icons8.com/?size=100&id=11683&format=png&color=000000" className="w-4 sm:w-8 h-4 sm:h-8"></img> 
					<h5 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white p-2">Soporte</h5>
				</div>
				<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Módulo para la gestión de tickets</p>
				<br/>
				{/* <button type="button" onClick={redirectToSupportModule}
						className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg 
						hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 
						dark:focus:ring-blue-800">
						Ingresar al módulo
				</button> */}
				<TextButton
					name="Ingresar al módulo"
					style="primary"
					onClick={handleSupportButtonClick} />
			</div>
		</div>
  )
}
