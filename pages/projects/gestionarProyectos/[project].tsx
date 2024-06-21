import Breadcrumb from "@/components/breadcrumb";
import { useRouter } from "next/router";

export default function ManageProject() {
    const router = useRouter();
    const { project: projectName } = router.query;

    return (
        <div>
            <Breadcrumb steps={[
                { name: "Proyectos", link: "/projects/" },
                { name: "Gestión de Proyectos", link: "/projects/gestionarProyectos" },
                { name: `${projectName}`, link: null }
            ]} />
            <div className="space-y-4">
                <header className="flex items-center">
                  <h1 className="text-2xl sm:text-4xl font-bold text-title line-clamp-2 sm:line-clamp-1 py-1">Gestionar Proyecto</h1>
                </header>
            </div>
        </div>
    )
}