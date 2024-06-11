import { useRouter } from 'next/router';
import Ticket, { TicketMode } from '@/components/ticket';

export default function NewTicket() {
    const router = useRouter();
    const { version } = router.query;

    return (
        <div className="container max-w-7xl mx-auto mt-8 sm:mt-4">
            <div className="mb-4">
                <h1 className="text-3xl font-bold decoration-gray-400">Creacion de ticket</h1>
                <h2 className="text-xl decoration-gray-700">Producto: {version}</h2>
            </div>
            <Ticket version={version as string}
                    stateDisabled={true} state="Nuevo"
                    mode={TicketMode.New}/>
        </div>
    )
}
