import { useRouter } from 'next/router';
import VersionHeader from '@/components/versionHeader';
import TaskGridRow from "@/components/taskGridRow";

function HeaderItem({ title }: { title: string }) {
    return <th className="px-6 py-3 text-sm text-left text-white border-b border-gray-200 bg-blue-950">{title}</th>
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
            title: "Curabitur sed erat ac magna dignissim aliquet. Proin quis mauris felis. Maecenas non arcu porttitor, venenatis leo eu, semper libero. Etiam sed augue vitae lacus placerat consequat nec at magna. Quisque ex turpis, fringilla quis mi in, finibus rutrum elit. Pellentesque non leo quis felis eleifend eleifend. Sed vestibulum nisl et sodales tincidunt. Aenean vitae arcu in urna congue feugiat. Maecenas nec enim sit amet ante lacinia porttitor sit amet non dui. Etiam semper dolor vitae nibh blandit laoreet. Aliquam gravida erat vel lectus porta, et dapibus leo blandit. Aliquam convallis nisi eu magna accumsan dignissim nec auctor nibh.",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sit amet est vitae urna tempus ultricies. Nullam risus velit, ultricies eu porttitor nec, sagittis sed nisi. Etiam eget ipsum eget massa euismod ultrices. Aliquam ullamcorper maximus ligula, eu finibus nisl porta sit amet. Ut laoreet nisl lacinia porta malesuada. Ut aliquam sapien eget mi sagittis vulputate. Morbi nec gravida ante, et sollicitudin sem. Proin ac augue pulvinar, tincidunt erat vel, dictum augue. Vestibulum ullamcorper lobortis risus, vitae laoreet velit molestie ut. Phasellus sagittis facilisis aliquet. Aenean sollicitudin at leo non lacinia. Morbi in tortor vulputate, suscipit nisl id, vestibulum lorem. Cras vitae tellus mattis, ornare tortor ut, lobortis nunc. Fusce ac lectus ipsum.",
            responsable: "Vestibulum placerat justo at augue congue, nec egestas arcu cursus. Donec placerat auctor risus et viverra. Proin porttitor velit eget fermentum ultrices. Aliquam quis tellus id urna malesuada hendrerit. Vivamus congue arcu in euismod cursus. Sed luctus ac lectus sed posuere. Etiam nec eros vitae lorem ultrices viverra. Morbi id est quis felis congue tempor lobortis ut lorem. Sed sollicitudin felis turpis, et condimentum ex viverra id. Phasellus quis egestas ipsum. Sed semper velit eu neque lacinia euismod.",
            state: "Cerrada"
        }
    ]

    const handleNewTaskButton = () => {
        router.push(`/products/${product}/${version}/${id}/tasks/new/`)
    }

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
                onClick={handleNewTaskButton}
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
                        <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 bg-gray-200 shadow sm:rounded-lg">
                            <table className="min-w-full">
                                <thead>
                                <tr>
                                    <HeaderItem title="Título" />
                                    <HeaderItem title="Descripcion" />
                                    <HeaderItem title="Responsable" />
                                    <HeaderItem title="Estado" />
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