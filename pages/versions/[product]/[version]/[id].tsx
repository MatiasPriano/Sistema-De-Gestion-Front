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
import { getTicket } from '@/services/supportService';
import EmptyPageText from '@/components/emptyPageText';

export default function ViewTicket() {
    const router = useRouter();
    const { product: productId, version: versionId, id: ticketId } = router.query;

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const handleDialogDelete = () => {
        toast.success("Ticket eliminado")
        setIsDeleteDialogOpen(false)
        router.push(`/versions/${productId}/${versionId}/`)
    }
    const handleDialogCancel = () => {
        setIsDeleteDialogOpen(false)
    }
    const handleTasksButton = () => {
        router.push(`/versions/${productId}/${versionId}/${ticketId}/tasks`)
    }
    const handleEditButton = () => {
        router.push(`/versions/${productId}/${versionId}/${ticketId}/edit`)
    }
    const handleDeleteTicketButton = () => {
        setIsDeleteDialogOpen(true)
    }

    const [ticket, setTicket] = useState<Ticket | null>(null)

    useEffect(() => {
        getTicket(ticketId as unknown as number).then((ticket) => setTicket(ticket))
    }, [])

    return (
        <div>
            <Breadcrumb steps={[
                { name: "Versiones", link: `/versions/`},
                { name: `${productId} - ${versionId}`, link: `/versions/${productId}/${versionId}/`},
                { name: `#${ticketId}`, link: null }
            ]} />
            <div className="space-y-4">
                <VersionHeader  productId={productId as string}
                                versionId={versionId as string}
                                ticketId=""
                                title="Ticket" />
                {ticket != null && <div className="flex">
                    <div className="flex items-center justify-start px-4">
                        <IconButton
                                icon="trash"
                                title="Eliminar ticket"
                                style="red"
                                onClick={handleDeleteTicketButton}/>
                    </div>
                    <div className="flex items-center justify-end gap-x-6 px-4 w-full">
                        <TextButton
                            name="Tareas"
                            style="secondary"
                            onClick={handleTasksButton} />
                        <TextButton
                            name="Editar"
                            style="primary"
                            onClick={handleEditButton} />
                    </div>
                </div>}
                {ticket != null && <TicketDetails ticket={ticket} />}
                {ticket === null && <EmptyPageText text="No se encontró el ticket" description="" icon='ticket' />}
                <div className="flex items-center justify-start gap-x-6 px-4">
                    <TextButton
                        name="Volver"
                        style="transparent"
                        onClick={() => router.back()} />
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
