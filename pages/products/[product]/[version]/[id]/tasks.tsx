import { useRouter } from 'next/router';
import VersionHeader from '@/components/versionHeader';
import TaskGridRow from "@/components/taskGridRow";

function HeaderItem({ title }: { title: string }) {
    return <th className="px-6 py-3 text-sm text-left text-gray-500 border-b border-gray-200 bg-gray-50">{title}</th>
}

export default function ViewTasks() {
    const router = useRouter();
    const { product, version, id } = router.query;

    const tasks = [
        {
            title: "Agregar un campo para modificar el monto de una cuota",
            description: "Con el mes de la cuota no iniciado, se debe poder modificar el monto de la cuota por cualquier valor positivo.",
            responsable: "Juan Perez",
            state: "Abierta"
        },
        {
            title: "Arreglar bug de severidad al crear un ticket",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sit amet est vitae urna tempus ultricies. Nullam risus velit, ultricies eu porttitor nec, sagittis sed nisi. Etiam eget ipsum eget massa euismod ultrices. Aliquam ullamcorper maximus ligula, eu finibus nisl porta sit amet. Ut laoreet nisl lacinia porta malesuada. Ut aliquam sapien eget mi sagittis vulputate. Morbi nec gravida ante, et sollicitudin sem. Proin ac augue pulvinar, tincidunt erat vel, dictum augue. Vestibulum ullamcorper lobortis risus, vitae laoreet velit molestie ut. Phasellus sagittis facilisis aliquet. Aenean sollicitudin at leo non lacinia. Morbi in tortor vulputate, suscipit nisl id, vestibulum lorem. Cras vitae tellus mattis, ornare tortor ut, lobortis nunc. Fusce ac lectus ipsum.",
            responsable: "Romina Lopez",
            state: "Cerrada"
        }
    ]

    return (
        <div className="container max-w-7xl mx-auto mt-8 sm:mt-4">
            <VersionHeader  productId={product as string}
                            versionId={version as string}
                            ticketId={id as string}
                            title="Tareas asociadas al ticket"
            />
            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                type="button"
                className="rounded-md bg-amber-500 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-colors duration-300 ease-in-out hover:bg-amber-200"
                >
                    Crear tarea
                </button>
                <button
                type="submit"
                className="rounded-md bg-blue-950 px-3 py-2 text-sm font-semibold text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-colors duration-300 ease-in-out hover:bg-blue-800"
                >
                    Asociar tarea existente
                </button>
            </div>
            <div className="container max-w-7xl mx-auto mt-8">
                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                        <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                            <table className="min-w-full">
                                <thead>
                                <tr>
                                    <HeaderItem title="Título" />
                                    <HeaderItem title="Descripcion" />
                                    <HeaderItem title="Responsable" />
                                    <HeaderItem title="Estado" />
                                    <HeaderItem title="Acciones" />
                                </tr>
                                </thead>

                                <tbody>
                                {tasks.map((task) => (
                                    <TaskGridRow key={task.title} task={task} />
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}