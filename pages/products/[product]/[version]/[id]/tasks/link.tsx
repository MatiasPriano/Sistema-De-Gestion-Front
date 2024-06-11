import { useRouter } from 'next/router';
import VersionHeader from '@/components/versionHeader';
import TaskGridRow from "@/components/taskGridRow";

function HeaderItem({ title }: { title: string }) {
    return <th className="px-6 py-3 text-sm text-white border-b border-gray-200 bg-blue-950">{title}</th>
}

export default function LinkTask() {
    const router = useRouter();
    const { product, version, id } = router.query;

    const tasks = [
        {
            title: "Agregar un campo para modificar el monto de una cuota",
            description: "Con el mes de la cuota no iniciado, se debe poder modificar el monto de la cuota por cualquier valor positivo.",
            responsable: "Juan Perez",
            project: "Sistema UPP - 2024",
            state: "Abierta"
        },
        {
            title: "Curabitur sed erat ac magna dignissim aliquet. Proin quis mauris felis. Maecenas non arcu porttitor, venenatis leo eu, semper libero. Etiam sed augue vitae lacus placerat consequat nec at magna. Quisque ex turpis, fringilla quis mi in, finibus rutrum elit. Pellentesque non leo quis felis eleifend eleifend. Sed vestibulum nisl et sodales tincidunt. Aenean vitae arcu in urna congue feugiat. Maecenas nec enim sit amet ante lacinia porttitor sit amet non dui. Etiam semper dolor vitae nibh blandit laoreet. Aliquam gravida erat vel lectus porta, et dapibus leo blandit. Aliquam convallis nisi eu magna accumsan dignissim nec auctor nibh.",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sit amet est vitae urna tempus ultricies. Nullam risus velit, ultricies eu porttitor nec, sagittis sed nisi. Etiam eget ipsum eget massa euismod ultrices. Aliquam ullamcorper maximus ligula, eu finibus nisl porta sit amet. Ut laoreet nisl lacinia porta malesuada. Ut aliquam sapien eget mi sagittis vulputate. Morbi nec gravida ante, et sollicitudin sem. Proin ac augue pulvinar, tincidunt erat vel, dictum augue. Vestibulum ullamcorper lobortis risus, vitae laoreet velit molestie ut. Phasellus sagittis facilisis aliquet. Aenean sollicitudin at leo non lacinia. Morbi in tortor vulputate, suscipit nisl id, vestibulum lorem. Cras vitae tellus mattis, ornare tortor ut, lobortis nunc. Fusce ac lectus ipsum.",
            responsable: "Vestibulum placerat justo at augue congue, nec egestas arcu cursus. Donec placerat auctor risus et viverra. Proin porttitor velit eget fermentum ultrices. Aliquam quis tellus id urna malesuada hendrerit. Vivamus congue arcu in euismod cursus. Sed luctus ac lectus sed posuere. Etiam nec eros vitae lorem ultrices viverra. Morbi id est quis felis congue tempor lobortis ut lorem. Sed sollicitudin felis turpis, et condimentum ex viverra id. Phasellus quis egestas ipsum. Sed semper velit eu neque lacinia euismod.",
            project: "Vestibulum placerat justo at augue congue, nec egestas arcu cursus. Donec placerat auctor risus et viverra. Proin porttitor velit eget fermentum ultrices. Aliquam quis tellus id urna malesuada hendrerit. Vivamus congue arcu in euismod cursus. Sed luctus ac lectus sed posuere. Etiam nec eros vitae lorem ultrices viverra. Morbi id est quis felis congue tempor lobortis ut lorem. Sed sollicitudin felis turpis, et condimentum ex viverra id. Phasellus quis egestas ipsum. Sed semper velit eu neque lacinia euismod.",
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
            <div className="relative flex pt-2">
                <input
                    type="search"
                    className="flex-auto rounded-s border border-solid border-neutral-200 bg-transparent px-3 py-[0.25rem] placeholder:text-neutral-500 focus:z-[3] focus:border-primary focus:shadow-inset focus:outline-none"
                    placeholder="Buscar"
                />
                <button
                    className="px-6 text-xs font-medium uppercase"
                    data-twe-ripple-init
                    data-twe-ripple-color="white"
                    type="button"
                    id="button-addon3">
                    Buscar
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
                                    <HeaderItem title="Proyecto"/>
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