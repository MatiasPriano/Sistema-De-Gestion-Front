import { useRouter } from 'next/router';
import VersionHeader from '@/components/versionHeader';
import TicketForm, { TicketInputs } from '@/components/form/ticketForm';
import Ticket, { emptyTicket } from '@/types/ticket';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Breadcrumb from '@/components/breadcrumb';
import Employee from '@/types/employee';
import { Client } from '@/types/client';

export default function NewTicket() {
    const router = useRouter();
    const { product: productId, version: versionId } = router.query;

    const [ ticket, setTicket ] = useState<Ticket>(emptyTicket)

    const disabledInputs: TicketInputs = {
        title: false,
        description: false,
        responsable: false,
        status: true,
        severity: false,
        client: false,
    }
    const requiredInputs: TicketInputs = {
        title: true,
        description: true,
        responsable: false,
        status: true,
        severity: true,
        client: true,
    }

    const onSubmit = () => {
        // TODO: API call a backend para crear ticket y obtener el id del ticket
        const ticketId = 1
        toast.success("Ticket creado")
        router.push(`/versions/${productId}/${versionId}/'${ticketId}/tasks`)
    }
    
    const [resources, setResources] = useState<Employee[]>([])
    // useEffect(() => {
    //     getResources().then((resources) => setResources(resources))
    // }, [])

    const [clients, setClients] = useState<Client[]>([])
    // useEffect(() => {
    //     getClients().then((clients) => setClients(clients))
    // })

    return (
        <div>
            <Breadcrumb steps={[
                { name: "Versiones", link: "/versions/" },
                { name: `${productId} - ${versionId}`, link: `/versions/${productId}/${versionId}/` },
                { name: "Nuevo ticket", link: null } 
            ]} />
            <VersionHeader  productId={productId as string}
                            versionId={versionId as string}
                            ticketId=""
                            title="Nuevo ticket"
            />
            <TicketForm
                ticket={ticket}
                setTicket={setTicket}
                disabledInputs={disabledInputs}
                requiredInputs={requiredInputs}
                onCancel={() => router.back()}
                resources={resources.map((resource) => resource.Nombre + " " + resource.Apellido)}
                clients={clients.map((client) => client['razon social'])}
                submitButtonName="Crear"
                onSubmit={onSubmit} />
        </div>
    )
}
