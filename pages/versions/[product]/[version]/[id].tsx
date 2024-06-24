import { useRouter } from 'next/router';
import VersionHeader from '@/components/versionHeader';
import Ticket from '@/types/ticket';
import TicketDetails from '@/components/ticketDetails';
import IconButton from '@/components/button/iconButton';
import TextButton from '@/components/button/textButton';
import ConfirmationDialog from '@/components/confirmationDialog';
import { toast } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import Breadcrumb from '@/components/breadcrumb';
import ticketsList from '@/components/ticketsMock';
import { deleteTicket, getTicket, getVersion } from '@/services/supportService';
import EmptyPageText from '@/components/emptyPageText';
import Loading from '@/components/loader';

export default function ViewTicket() {
    const router = useRouter();
    const { product: productId, version: versionId, id: ticketId } = router.query;

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const handleDialogDelete = () => {
        deleteTicket(Number(ticketId)).then((wasDeleted) => {
            setIsDeleteDialogOpen(false)
            if (wasDeleted) {
                toast.success("Ticket eliminado")
                router.push(`/versions/${productId}/${versionId}/`)
            } else {
                toast.error("No se pudo eliminar el ticket")
            }
        })
        
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
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [productName, setProductName] = useState<string>("")
    const [versionName, setVersionName] = useState<string>("")

    useEffect(() => {
        let ticketPromise = getTicket(Number(ticketId))
        let versionPromise = getVersion(Number(versionId))
        
        Promise.all([ticketPromise, versionPromise]).then(([ticket, version]) => {
            setTicket(ticket)
            setProductName(version.product.name)
            setVersionName(version.name)
            setIsLoading(false)    
        })
    }, [])

    
    useEffect(() => {
        getVersion(Number(versionId)).then((version) => {
            setProductName(version.product.name)
            setVersionName(version.name)
        })
    }, [])

    return (
        <div>
            <Breadcrumb steps={[
                { name: "Versiones", link: `/versions/`},
                { name: `${productId} - ${versionId}`, link: `/versions/${productId}/${versionId}/`},
                { name: `#${ticketId}`, link: null }
            ]} />
            <div className="space-y-4">
                {!isLoading && <VersionHeader  productId={productName}
                                versionId={versionName}
                                ticketId=""
                                title="Ticket" />}
                {ticket !== null && !isLoading && <div className="flex">
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
                {ticket !== null && !isLoading && <TicketDetails ticket={ticket} />}
                {ticket === null && !isLoading && <EmptyPageText text="No se encontró el ticket" description="" icon='ticket' />}
                {ticket === null && isLoading && <Loading data="ticket"/>}
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
