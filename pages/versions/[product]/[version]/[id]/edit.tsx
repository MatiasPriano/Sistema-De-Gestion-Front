import { useRouter } from 'next/router';
import VersionHeader from '@/components/versionHeader';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import Breadcrumb from '@/components/breadcrumb';
import Employee from '@/types/employee';
import { TicketInputs } from '@/types/ticketInputs';
import EditTicket, { emptyEditTicket, getEditTicketFromTicket } from '@/types/editTicket';
import { getEmployees, getTicket, getVersion, updateTicket } from '@/services/supportService';
import EditTicketForm from '@/components/form/editTicketForm';
import Loading from '@/components/loader';

export default function EditTicketComponent() {
    const router = useRouter();
    const { product: productId, version: versionId, id: ticketId } = router.query;

    const disabledInputs: TicketInputs = {
        title: true,
        description: false,
        employee: false,
        status: false,
        severity: true,
        client: true,
    }
    const requiredInputs: TicketInputs = {
        title: true,
        description: true,
        employee: false,
        status: true,
        severity: true,
        client: true,
    }

    const onCancel = () => {
        router.back()
    }

    const onSubmit = () => {
        updateTicket(editTicket, Number(ticketId)).then((id) => {
            if (id === -1) {
                toast.error("No se pudo editar el ticket")
            } else {
                toast.success("Cambios guardados")
                router.back()
            }
        })
    }

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [editTicket, setEditTicket] = useState<EditTicket>(emptyEditTicket)
    const [productName, setProductName] = useState<string>("")
    const [versionName, setVersionName] = useState<string>("")
    useEffect(() => {
        let ticketPromise = getTicket(Number(ticketId))
        let versionPromise = getVersion(Number(versionId))

        Promise.all([ticketPromise, versionPromise]).then(([ticket, version]) => {
            if (ticket === null) {
                toast.error("Ticket no existe")
                router.push(`/versions/${productId}/${versionId}`)
            } else {
                setEditTicket(getEditTicketFromTicket(ticket))
            }
            setProductName(version.product.name)
            setVersionName(version.name)
            setIsLoading(false)
        })
    }, [])

    const [employees, setEmployees] = useState<Employee[]>([])
    useEffect(() => {
        getEmployees().then((employees) => setEmployees(employees))
    }, [])

    return (
        <div>
            <Breadcrumb steps={[
                { name: "Versiones", link: `/versions/` },
                { name: `${productId} - ${versionId}`, link: `/versions/${productId}/${versionId}/` },
                { name: `#${ticketId}`, link: `/versions/${productId}/${versionId}/${ticketId}` },
                { name: "Editar ticket", link: null }
            ]} />
            {!isLoading && <VersionHeader  productId={productName}
                            versionId={versionName}
                            ticketId={ticketId as string}
                            title="Editar un ticket" />}
            {!isLoading && <EditTicketForm
                editTicket={editTicket}
                setEditTicket={setEditTicket}
                disabledInputs={disabledInputs}
                requiredInputs={requiredInputs}
                submitButtonName={'Guardar cambios'}
                onSubmit={onSubmit}
                onCancel={onCancel}
                employees={employees} />}
            {isLoading && <Loading data="ticket"/>}
        </div>
    )
}