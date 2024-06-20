import { useRouter } from 'next/router';
import VersionHeader from '@/components/versionHeader';
import Ticket, { emptyTicket } from '@/types/ticket';
import TicketDetails from '@/components/ticketDetails';
import IconButton from '@/components/button/iconButton';
import TextButton from '@/components/button/textButton';
import ConfirmationDialog from '@/components/confirmationDialog';
import { toast } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import Breadcrumb from '@/components/breadcrumb';
import ticketsList from '@/components/ticketsMock';

export default function ViewTicket() {
    const router = useRouter();
    const { product: productId, version: versionId, id: ticketId } = router.query;

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const handleDialogDelete = () => {
        toast.success("Ticket eliminado")
        setIsDeleteDialogOpen(false)
        router.push(`/products/${productId}/${versionId}/`)
    }
    const handleDialogCancel = () => {
        setIsDeleteDialogOpen(false)
    }
    const handleTasksButton = () => {
        router.push(`/products/${productId}/${versionId}/${ticketId}/tasks`)
    }
    const handleEditButton = () => {
        router.push(`/products/${productId}/${versionId}/${ticketId}/edit`)
    }
    const handleDeleteTicketButton = () => {
        setIsDeleteDialogOpen(true)
    }
    const handleBackButton = () => {
        router.push(`/products/${productId}/${versionId}/`)
    }

    const [ticket, setTicket] = useState<Ticket>(emptyTicket)

    useEffect(() => {
        // TODO: API call para conseguir los datos del ticket con id {ticketId}
        setTicket(ticketsList[ticketId as unknown as number - 1])
    }, [])

    return (
        <div>
            <Breadcrumb steps={[
                { name: "Productos", link: `/products/`},
                { name: `${productId} - ${versionId}`, link: `/products/${productId}/${versionId}/`},
                { name: `#${ticketId}`, link: null }
            ]} />
            <div className="space-y-4">
                <VersionHeader  productId={productId as string}
                                versionId={versionId as string}
                                ticketId=""
                                title="" >
                </VersionHeader>
                <TicketDetails ticket={ticket} />
                <div className='flex'>
                    <div className="flex items-center justify-start gap-x-6 px-4">
                        <TextButton
                            name="Volver"
                            style="transparent"
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
        </div>
    )
}
