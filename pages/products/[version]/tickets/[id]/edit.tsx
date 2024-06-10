import { useRouter } from 'next/router';
import Ticket from '@/components/ticket';

export default function ViewTicket() {
    const router = useRouter();
    const { version, id } = router.query;

    return (
        <div className="container max-w-7xl mx-auto mt-8 sm:mt-4">
            <div className="mb-4">
                <h1 className="text-3xl font-bold decoration-gray-400">Editar ticket {id}</h1>
                <h2 className="text-xl decoration-gray-700">Producto: {version}</h2>
            </div>
            <Ticket version={version as string}
                    titleDisabled={true}
                    clientDisabled={true}
                    includeButtons={true}
                    submitText='Editar'/>
        </div>
    )
}