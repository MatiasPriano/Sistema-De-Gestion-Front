import { useRouter } from 'next/router';
import VersionHeader from '@/components/versionHeader';
import Ticket from '@/types/ticket';
import TicketDetails from '@/components/ticketDetails';
import IconButton from '@/components/button/iconButton';
import TextButton from '@/components/button/textButton';
import ConfirmationDialog from '@/components/confirmationDialog';
import { toast } from 'react-hot-toast';
import { useState } from 'react';

export default function ViewTicket() {
    const router = useRouter();
    const { product, version, id } = router.query;

    // const ticketExample: Ticket = {
    //     id: 0,
    //     title: "TKT-123",
    //     responsable: "Juanito",
    //     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    //     status: "Esperando desarrollo",
    //     severity: "S4",
    //     client: "3 Amigos Tecnologies"
    // }
    const ticketExample: Ticket = {
        id: 0,
        title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        responsable: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        status: "Esperando desarrollo",
        severity: "S4",
        client: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const handleDialogDelete = () => {
        toast.success("Ticket eliminado")
        setIsDeleteDialogOpen(false)
        router.push(`/products/${product}/${version}/`)
    }
    const handleDialogCancel = () => {
        setIsDeleteDialogOpen(false)
    }
    const handleTasksButton = () => {
        router.push(`/products/${product}/${version}/${id}/tasks`)
    }
    const handleEditButton = () => {
        router.push(`/products/${product}/${version}/${id}/edit`)
    }
    const handleDeleteTicketButton = () => {
        setIsDeleteDialogOpen(true)
    }
    const handleBackButton = () => {
        router.push(`/products/${product}/${version}/`)
    }

    return (
        <div className="space-y-4">
            <VersionHeader  productId={product as string}
                            versionId={version as string}
                            ticketId=""
                            title=""
            >
            </VersionHeader>
            <TicketDetails ticket={ticketExample} />
            <div className='flex'>
                <div className="flex items-center justify-start gap-x-6 px-4">
                    <TextButton
                        name="Volver"
                        style="subtle"
                        onClick={handleBackButton} />
                </div>
                <div className="flex items-center justify-end gap-x-6 px-4 w-full">
                    <IconButton
                        icon="trash"
                        title="Eliminar ticket"
                        style="red"
                        onClick={handleDeleteTicketButton}/>
                    <TextButton
                        name="Tareas"
                        style="secondary"
                        onClick={handleTasksButton} />
                    <TextButton
                        name="Editar"
                        style="primary"
                        onClick={handleEditButton} />
                    </div>
                    <ConfirmationDialog
                    isOpen={isDeleteDialogOpen}
                    title="Eliminar ticket"
                    message="¿Está seguro/a de que desea eliminar este ticket?"
                    onConfirm={handleDialogDelete}
                    onCancel={handleDialogCancel} />
            </div>
        </div>
    )
}
