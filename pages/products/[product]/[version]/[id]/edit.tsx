import { useRouter } from 'next/router';
import TicketForm, { TicketInputs } from '@/components/form/ticketForm';
import VersionHeader from '@/components/versionHeader';
import Ticket from '@/types/ticket';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import Breadcrumb from '@/components/breadcrumb';

export default function ViewTicket() {
    const router = useRouter();
    const { product, version, id } = router.query;

    const ticketExample: Ticket = {
        id: 0,
        title: "TKT-123",
        responsable: "Juanito",
        description: "Al agregar un ticket con severidad 4, se guarda como severidad 3",
        status: "En progreso",
        severity: "S4",
        client: "3 Amigos Tecnologies",
        createdDateTime: ""
    }
    const [ticket, setTicket] = useState(ticketExample)

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
        router.push(`/products/${product}/${version}/${id}`)
    }

    const onSubmit = () => {
        // TODO: API call a backend para editar ticket
        toast.success("Cambios guardados")
        router.push(`/products/${product}/${version}/${id}`)
    }

    return (
        <div>
            <Breadcrumb steps={[
                { name: "Productos", link: `/products/` },
                { name: `${product} - ${version}`, link: `/products/${product}/${version}/` },
                { name: `#${id}`, link: `/products/${product}/${version}/${id}` },
                { name: "Editar ticket", link: null }
            ]} />
            <VersionHeader  productId={product as string}
                            versionId={version as string}
                            ticketId={id as string}
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
                resources={[]}
                clients={["3 Amigos Tecnologies"]} />
        </div>
    )
}