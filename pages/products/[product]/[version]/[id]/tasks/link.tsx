import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import VersionHeader from '@/components/versionHeader';
import LinkTaskTable from '@/components/compactTable/linkTasks/linkTaskTable';
import EmptyTableText from '@/components/compactTable/emptyTableText';
import Task from '@/types/task';
import { ChangeEvent, useState } from 'react';
import TextButton from '@/components/button/textButton';
import Breadcrumb from '@/components/breadcrumb';
import IconButton from '@/components/button/iconButton';
import Input from '@/components/input/input';

export default function LinkTask() {
    const router = useRouter();
    const { product, version, id } = router.query;

    const [selectedTasks, setSelectedTasks] = useState<number[]>([])

    const tasks: Task[] = [
        {
            id: 323,
            title: "Agregar un campo para modificar el monto de una cuota",
            project: "Sistema UPP - 2024",
            responsable: "Juan Perez",
            status: "Abierta",
            priority: "Baja",
            description: ''
        },
        {
            id: 1,
            title: "Curabitur sed erat ac magna dignissim aliquet. Proin quis mauris felis. Maecenas non arcu porttitor, venenatis leo eu, semper libero. Etiam sed augue vitae lacus placerat consequat nec at magna. Quisque ex turpis, fringilla quis mi in, finibus rutrum elit. Pellentesque non leo quis felis eleifend eleifend. Sed vestibulum nisl et sodales tincidunt. Aenean vitae arcu in urna congue feugiat. Maecenas nec enim sit amet ante lacinia porttitor sit amet non dui. Etiam semper dolor vitae nibh blandit laoreet. Aliquam gravida erat vel lectus porta, et dapibus leo blandit. Aliquam convallis nisi eu magna accumsan dignissim nec auctor nibh.",
            project: "Vestibulum placerat justo at augue congue, nec egestas arcu cursus. Donec placerat auctor risus et viverra. Proin porttitor velit eget fermentum ultrices. Aliquam quis tellus id urna malesuada hendrerit. Vivamus congue arcu in euismod cursus. Sed luctus ac lectus sed posuere. Etiam nec eros vitae lorem ultrices viverra. Morbi id est quis felis congue tempor lobortis ut lorem. Sed sollicitudin felis turpis, et condimentum ex viverra id. Phasellus quis egestas ipsum. Sed semper velit eu neque lacinia euismod.",
            responsable: "Vestibulum placerat justo at augue congue, nec egestas arcu cursus. Donec placerat auctor risus et viverra. Proin porttitor velit eget fermentum ultrices. Aliquam quis tellus id urna malesuada hendrerit. Vivamus congue arcu in euismod cursus. Sed luctus ac lectus sed posuere. Etiam nec eros vitae lorem ultrices viverra. Morbi id est quis felis congue tempor lobortis ut lorem. Sed sollicitudin felis turpis, et condimentum ex viverra id. Phasellus quis egestas ipsum. Sed semper velit eu neque lacinia euismod.",
            status: "Cerrada",
            priority: "Alta",
            description: ''
        }
    ]

    const handleLinkTaskClick = () => {
        if (selectedTasks.length === 1) {
            toast.success("1 tarea asociada correctamente")
        } else {
            toast.success(`${selectedTasks.length} tareas asociadas correctamente`)
        }
        router.push(`/products/${product}/${version}/${id}/tasks/`)
    }

    const [searchText, setSearchText] = useState("")
    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value)
    }

    const onSearchClick = () => {
        // TODO: API call para obtener las tareas con un nombre que contenga searchText
    }

    return (
        <div>
            <Breadcrumb steps={[
                { name: "Productos", link: `/products/` },
                { name: `${product} - ${version}`, link: `/products/${product}/${version}/` },
                { name: `#${id}`, link: `/products/${product}/${version}/${id}` },
                { name: "Tareas asociadas", link: `/products/${product}/${version}/${id}/tasks/` },
                { name: "Asociar tarea", link: null }
            ]} />
            <VersionHeader  productId={product as string}
                            versionId={version as string}
                            ticketId={id as string}
                            title="Asociar tareas al ticket"
            />
            <div className="flex pb-4 space-x-4 items-center">
                <IconButton
                    icon="search"
                    title="Buscar"
                    style="primary"
                    onClick={onSearchClick}
                     />
                <div className="w-full">
                    <Input
                        title=""
                        placeholder="Buscar"
                        value={searchText}
                        setValue={handleSearch}
                        isRequired={false} />
                </div>
                
                <TextButton
                    name="Asociar"
                    style="secondary"
                    onClick={handleLinkTaskClick}
                    disabled={selectedTasks.length === 0} />
            </div>
            {tasks.length > 0 && 
                <LinkTaskTable
                    tasks={tasks}
                    selectedTasks={selectedTasks}
                    setSelectedTasks={setSelectedTasks} />}
            {tasks.length === 0 && <EmptyTableText text="No se encontraron resultados" icon="search"/>}
        </div>
    )
}