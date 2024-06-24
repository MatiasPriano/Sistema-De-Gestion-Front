import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import VersionHeader from '@/components/versionHeader';
import LinkTaskTable from '@/components/compactTable/linkTasks/linkTaskTable';
import EmptyPageText from '@/components/emptyPageText';
import Task from '@/types/task';
import { ChangeEvent, useEffect, useState } from 'react';
import TextButton from '@/components/button/textButton';
import Breadcrumb from '@/components/breadcrumb';
import IconButton from '@/components/button/iconButton';
import Input from '@/components/input/input';
import Loading from '@/components/loader';
import { associateTasks, getAllTasks, getTaskIdsByTicket, getTasks, getVersion } from '@/services/supportService';

export default function LinkTask() {
  const router = useRouter();
  const { product: productId, version: versionId, id: ticketId } = router.query;

  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);

    const handleLinkTaskClick = () => {
        associateTasks(Number(ticketId), selectedTasks).then((wasLinked) => {
            if (wasLinked) {
                if (selectedTasks.length === 1) {
                    toast.success("1 tarea asociada correctamente")
                } else {
                    toast.success(`${selectedTasks.length} tareas asociadas correctamente`)
                }
                router.push(`/versions/${productId}/${versionId}/${ticketId}/tasks/`)
            } else {
                toast.error("Hubo un error al intentar asociar tareas")
            }
        })
        
    }

    const [tasks, setTasks] = useState<Task[]>([])
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [productName, setProductName] = useState<string>("")
    const [versionName, setVersionName] = useState<string>("")
    useEffect(() => {
        let tasksPromise = getAllTasks()
        let ticketTaskIdsPromise = getTaskIdsByTicket(Number(ticketId))
        let versionPromise = getVersion(Number(versionId))

        Promise.all([tasksPromise, ticketTaskIdsPromise, versionPromise]).then(([tasks, ticketTasksIds, version]) => {
            setProductName(version.product.name)
            setVersionName(version.name)
            let notLinkedTasks = tasks.filter((task) => !ticketTasksIds.includes(task.id))
            setTasks(notLinkedTasks)
            setFilteredTasks(notLinkedTasks)
            setIsLoading(false)
        })

        
        Promise.all([tasksPromise, versionPromise]).then(([tasks, version]) => {
            
            
        })
    }, [])

    const [searchText, setSearchText] = useState("")
    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value)
    }

  const onSearchClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFilteredTasks(tasks.filter((task) => task.title.includes(searchText)));
  };

  return (
    <>
      {!isLoading && (
        <Breadcrumb
          steps={[
            { name: "Productos", link: `/versions/` },
            {
              name: `${productName} - ${productName}`,
              link: `/versions/${productId}/${versionId}/`,
            },
            {
              name: `#${ticketId}`,
              link: `/versions/${productId}/${versionId}/${ticketId}`,
            },
            {
              name: "Tareas asociadas",
              link: `/versions/${productId}/${versionId}/${ticketId}/tasks/`,
            },
            { name: "Asociar tarea", link: null },
          ]}
        />
      )}
      <div className="space-y-4">
        {!isLoading && (
          <VersionHeader
            productId={productName}
            versionId={versionName}
            ticketId={ticketId as string}
            title="Asociar tareas al ticket"
          />
        )}
        {!isLoading && (
          <div className="flex space-x-4 items-center px-4">
            <form
              onSubmit={onSearchClick}
              className="flex space-x-4 items-center w-full"
            >
              <div className="w-full">
                <Input
                  title=""
                  placeholder="Buscar"
                  value={searchText}
                  setValue={handleSearch}
                  isRequired={false}
                />
              </div>
              <IconButton
                icon="search"
                title="Buscar"
                style="primary"
                type="submit"
              />
            </form>
            <TextButton
              name="Asociar"
              style="secondary"
              onClick={handleLinkTaskClick}
              disabled={selectedTasks.length === 0}
            />
          </div>
        )}
        {filteredTasks.length > 0 && !isLoading && (
          <LinkTaskTable
            tasks={filteredTasks}
            selectedTasks={selectedTasks}
            setSelectedTasks={setSelectedTasks}
          />
        )}
        {filteredTasks.length === 0 && !isLoading && (
          <EmptyPageText
            text="No se encontraron resultados"
            description="Pruebe con otro valor"
            icon="search"
          />
        )}
        {filteredTasks.length === 0 && isLoading && <Loading data="tareas" />}
        <div className="flex items-center justify-start gap-x-6 px-4">
          <TextButton
            name="Volver"
            style="transparent"
            onClick={() => router.back()}
          />
        </div>
      </div>
    </>
  );
}
