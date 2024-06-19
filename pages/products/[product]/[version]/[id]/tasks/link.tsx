import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import VersionHeader from '@/components/versionHeader';
import LinkTaskTable from '@/components/compactTable/linkTasks/linkTaskTable';
import EmptyTableText from '@/components/compactTable/emptyTableText';
import Task from '@/types/task';
import { ChangeEvent, useEffect, useState } from 'react';
import TextButton from '@/components/button/textButton';
import Breadcrumb from '@/components/breadcrumb';
import IconButton from '@/components/button/iconButton';
import Input from '@/components/input/input';
import tasksList from '@/components/tasksMock';

export default function LinkTask() {
    const router = useRouter();
    const { product: productId, version: versionId, id: ticketId } = router.query;

    const [selectedTasks, setSelectedTasks] = useState<number[]>([])

    const handleLinkTaskClick = () => {
        if (selectedTasks.length === 1) {
            toast.success("1 tarea asociada correctamente")
        } else {
            toast.success(`${selectedTasks.length} tareas asociadas correctamente`)
        }
        router.push(`/products/${productId}/${versionId}/${ticketId}/tasks/`)
    }

    const [tasks, setTasks] = useState<Task[]>([])
    useEffect(() => {
        // TODO: API call para obtener las primeras N tareas del back de proyectos
        setTasks(tasksList)
    }, [])

    const [searchText, setSearchText] = useState("")
    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value)
    }

    const onSearchClick = () => {
        // TODO: API call para obtener las tareas con un nombre que contenga searchText y setearlas con setTasks
    }

    return (
        <div>
            <Breadcrumb steps={[
                { name: "Productos", link: `/products/` },
                { name: `${productId} - ${versionId}`, link: `/products/${productId}/${versionId}/` },
                { name: `#${ticketId}`, link: `/products/${productId}/${versionId}/${ticketId}` },
                { name: "Tareas asociadas", link: `/products/${productId}/${versionId}/${ticketId}/tasks/` },
                { name: "Asociar tarea", link: null }
            ]} />
            <VersionHeader  productId={productId as string}
                            versionId={versionId as string}
                            ticketId={ticketId as string}
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
            {tasks.length === 0 && <EmptyTableText text="No se encontraron resultados" description="Pruebe con otra entrada" icon="search"/>}
        </div>
    )
}