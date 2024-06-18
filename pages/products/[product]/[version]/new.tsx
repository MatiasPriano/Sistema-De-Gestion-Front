import { useRouter } from 'next/router';
import VersionHeader from '@/components/versionHeader';
import TicketForm, { TicketInputs } from '@/components/form/ticketForm';
import Ticket from '@/types/ticket';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import Breadcrumb from '@/components/breadcrumb';

export default function NewTicket() {
    const router = useRouter();
    const { product, version } = router.query;

    const [ ticket, setTicket ] = useState<Ticket>(
        {
            id: 0,
            title: "",
            description: "",
            responsable: "",
            status: "Nuevo",
            severity: "S1",
            client: ""
        }
    )

    const disabledInputs: TicketInputs = {
        title: false,
        description: false,
        responsable: false,
        status: false,
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

    const onCancel = () => {
        router.push(`/products/${product}/${version}/`)
    }

    const onSubmit = () => {
        // TODO: API call a backend para crear ticket
        toast.success("Ticket creado")
        router.push(`/products/${product}/${version}/`)
    }

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
                onCancel={onCancel}
                resources={["Pepito", "Pepita"]}
                clients={["Volkswagen", "Fiat", "Ford"]}
                submitButtonName="Crear"
                onSubmit={onSubmit} />
        </div>
    )
}
