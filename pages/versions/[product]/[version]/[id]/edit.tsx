import { useRouter } from 'next/router';
import TicketForm, { TicketInputs } from '@/components/form/ticketForm';
import VersionHeader from '@/components/versionHeader';
import Ticket, { emptyTicket } from '@/types/ticket';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Breadcrumb from '@/components/breadcrumb';
import ticketsList from '@/components/ticketsMock';
import getResources from '@/services/resourceService';
import Employee from '@/types/employee';

export default function ViewTicket() {
    const router = useRouter();
    const { product: productId, version: versionId, id: ticketId } = router.query;

    const disabledInputs: TicketInputs = {
        title: true,
        description: false,
        responsable: false,
        status: false,
        severity: false,
        client: true,
    }
    const requiredInputs: TicketInputs = {
        title: true,
        description: true,
        responsable: false,
        status: true,
        severity: true,
        client: true,
    }

    const onCancel = () => {
        router.back()
    }

    const onSubmit = () => {
        // TODO: API call a backend para editar ticket
        toast.success("Cambios guardados")
        router.push(`/products/${productId}/${versionId}/${ticketId}`)
    }

    const [ticket, setTicket] = useState(emptyTicket)
    useEffect(() => {
        // TODO: API call para obtener detalles del ticket
        // fetch(URL.url + '/v1/...')
        // .then((response) =>{
        //     return response.json()
        // })
        // .then((ticketData) => {
        //     setTicket(ticketData[ticketId as unknown as number - 1])
        // })
        setTicket(ticketsList[ticketId as unknown as number - 1])
    }, [])

    const [resources, setResources] = useState<Employee[]>([])
    useEffect(() => {
        getResources().then((resources) => setResources(resources)).catch((e) => console.log(e))
    }, [])

    return (
        <div>
            <Breadcrumb steps={[
                { name: "Productos", link: `/products/` },
                { name: `${productId} - ${versionId}`, link: `/products/${productId}/${versionId}/` },
                { name: `#${ticketId}`, link: `/products/${productId}/${versionId}/${ticketId}` },
                { name: "Editar ticket", link: null }
            ]} />
            <VersionHeader  productId={productId as string}
                            versionId={versionId as string}
                            ticketId={ticketId as string}
                            title="Editar un ticket"
            />
            <TicketForm
                ticket={ticket}
                setTicket={setTicket}
                disabledInputs={disabledInputs}
                requiredInputs={requiredInputs}
                submitButtonName={'Guardar cambios'}
                onSubmit={onSubmit}
                onCancel={onCancel}
                resources={resources.map((resource) => resource.Nombre + " " + resource.Apellido)}
                clients={[]} />
        </div>
    )
}