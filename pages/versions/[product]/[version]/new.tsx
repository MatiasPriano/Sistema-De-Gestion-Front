import { useRouter } from 'next/router';
import VersionHeader from '@/components/versionHeader';
import Ticket from '@/types/ticket';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Breadcrumb from '@/components/breadcrumb';
import Employee from '@/types/employee';
import { Client } from '@/types/client';
import { createTicket, getClients, getEmployees } from '@/services/supportService';
import NewTicket, { getEmptyNewTicket } from '@/types/newTicket';
import { TicketInputs } from '@/types/ticketInputs';
import NewTicketForm from '@/components/form/newTicketForm';

export default function NewTicketComponent() {
    const router = useRouter();
    const { product: productId, version: versionId } = router.query;

    const [ newTicket, setNewTicket ] = useState<NewTicket>(getEmptyNewTicket(Number(versionId)))

    const disabledInputs: TicketInputs = {
        title: false,
        description: false,
        employee: false,
        status: true,
        severity: false,
        client: false,
    }
    const requiredInputs: TicketInputs = {
        title: true,
        description: true,
        employee: false,
        status: true,
        severity: true,
        client: true,
    }

    const onSubmit = () => {
        console.log("NewTicket: ", newTicket)
        createTicket(newTicket).then((ticketId) => {
            if (ticketId === -1) {
                toast.error("Hubo un problema al crear el ticket")
            } else {
                toast.success("Ticket creado")
                router.push(`/versions/${productId}/${versionId}/${ticketId}/tasks`)
            }
        })
    }
    
    const [employees, setEmployees] = useState<Employee[]>([])
    useEffect(() => {
        getEmployees().then((employee) => setEmployees(employee))
    }, [])

    const [clients, setClients] = useState<Client[]>([])
    useEffect(() => {
        getClients().then((clients) => setClients(clients))
    })

    // const [versionName, setVersionName] = useState<string>("")
    // const [productName, setProductName] = useState<string>("")
    // useEffect(() => {
    //     getVersion(Number(versionId)).then((version) => {
    //         setProductName(version.product.name)
    //         setVersionName(version.name)
    //     })
    // }, [])

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
            <NewTicketForm
                newTicket={newTicket}
                setNewTicket={setNewTicket}
                disabledInputs={disabledInputs}
                requiredInputs={requiredInputs}
                onCancel={() => router.back()}
                employees={employees}
                clients={clients}
                submitButtonName="Crear"
                onSubmit={onSubmit} />
        </div>
    )
}
