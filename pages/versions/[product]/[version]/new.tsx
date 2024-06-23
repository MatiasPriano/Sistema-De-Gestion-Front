import { useRouter } from 'next/router';
import VersionHeader from '@/components/versionHeader';
import TicketForm, { TicketInputs } from '@/components/form/ticketForm';
import Ticket, { emptyTicket } from '@/types/ticket';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Breadcrumb from '@/components/breadcrumb';
import Employee from '@/types/employee';
import getResources from '@/services/resourceService';
import { Client } from '@/types/client';
import getClients from '@/services/clientService';

export default function NewTicket() {
    const router = useRouter();
    const { product, version } = router.query;

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
        router.push(`/products/${product}/${version}/'${ticketId}/tasks`)
    }
    
    const [resources, setResources] = useState<Employee[]>([])
    useEffect(() => {
        getResources().then((resources) => setResources(resources)).catch((e) => console.log(e))
    }, [])

    const [clients, setClients] = useState<Client[]>([])
    useEffect(() => {
        getClients().then((clients) => setClients(clients)).catch((e) => console.log(e))
    })

    return (
        <div>
            <Breadcrumb steps={[
                { name: "Productos", link: "/products/" },
                { name: `${product} - ${version}`, link: `/products/${product}/${version}/` },
                { name: "Nuevo ticket", link: null } 
            ]} />
            <VersionHeader  productId={product as string}
                            versionId={version as string}
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
