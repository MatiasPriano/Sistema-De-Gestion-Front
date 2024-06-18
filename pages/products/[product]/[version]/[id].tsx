import { useRouter } from 'next/router';
import VersionHeader from '@/components/versionHeader';
import Ticket from '@/types/ticket';
import TicketDetails from '@/components/ticketDetails';
import IconButton from '@/components/button/iconButton';
import TextButton from '@/components/button/textButton';
import ConfirmationDialog from '@/components/confirmationDialog';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import Breadcrumb from '@/components/breadcrumb';

export default function ViewTicket() {
    const router = useRouter();
    const { product, version, id } = router.query;

    const ticketExample: Ticket = {
        id: 1,
        title: "Rediseño del Sitio Web",
        responsable: "Juan Pérez",
        description: "Rediseñar el sitio web de la empresa para mejorar la experiencia del usuario y modernizar el diseño.",
        status: "En progreso",
        severity: "S3",
        client: "Empresa ABC"
    };

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
        <div>
            <Breadcrumb steps={[
                { name: "Productos", link: `/products/`},
                { name: `${product} - ${version}`, link: `/products/${product}/${version}/`},
                { name: `#${id}`, link: null }
            ]} />
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
        </div>
    )
}
