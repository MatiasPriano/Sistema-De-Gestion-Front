import TextButton from "@/components/button/textButton";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();

  const handleProjectButtonClick = () => {
    router.push("/projects");
  };

  const handleSupportButtonClick = () => {
    router.push("/versions");
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center py-5">
      <div className="bg-backgroundAccent max-w-sm p-6 border border-border shadow-md hover:shadow-lg rounded-lg shadow w-full m-5 h-52 w-80">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-7 w-7 text-title"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25"
            />
          </svg>
          <h5 className="text-xl sm:text-2xl font-bold tracking-tight text-textColor p-2 text-title">
            Proyectos
          </h5>
        </div>
        <p className="mb-3 font-normal text-subtitle">
          Módulo para la gestión de proyectos y tareas
        </p>
        <br />
        <TextButton
          name="Ingresar al módulo"
          style="primary"
          onClick={handleProjectButtonClick}
        />
      </div>

      <div className="bg-backgroundAccent max-w-sm p-6 border border-border shadow-md hover:shadow-lg rounded-lg shadow w-full m-5 h-52 w-80">
        <div className="flex items-center">
          <img
            src="https://img.icons8.com/?size=100&id=11683&format=png&color=000000"
            className="h-7 w-7 text-title"
          ></img>
          <h5 className="text-xl sm:text-2xl font-bold tracking-tight text-title p-2">
            Soporte
          </h5>
        </div>
        <p className="mb-3 font-normal text-subtitle">
          Módulo para la gestión de tickets
        </p>
        <br />
        {/* <button type="button" onClick={redirectToSupportModule}
						className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg 
						hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 
						dark:focus:ring-blue-800">
						Ingresar al módulo
				</button> */}
        <TextButton
          name="Ingresar al módulo"
          style="primary"
          onClick={handleSupportButtonClick}
        />
      </div>
    </div>
  );
}
