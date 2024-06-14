import {useEffect, useState} from "react";
import { useRouter } from 'next/router';
import TicketGridRow from "@/components/ticketGridRow";
import VersionHeader from "@/components/versionHeader";
import ticketsList from "@/components/ticketsMock";

function HeaderItem({ title }: { title: string }) {
    return <th className="px-6 py-2 text-sm text-white bg-blue-950">{title}</th>
}

export default function Tickets() {
    const [list, setList] = useState([])

    useEffect(() => {     
    }, [])

    const router = useRouter();
    const { product, version } = router.query;

    const handleNewTicketButton = () => {
        router.push(`/products/${product}/${version}/new`)
    }

    return (
        <>
            {/* ACA EMPIEZA LA GRILLA */}
            <div>
                <VersionHeader  productId={product as string}
                                versionId={version as string}
                                ticketId=""
                                title="Tickets"
                />
                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                        <div className='rounded-xl border border-blue-950 overflow-hidden'>
                            <table className="min-w-full">
                                <thead>
                                <tr>
                                    <HeaderItem title="Título" />
                                    <HeaderItem title="Fecha de creación" />
                                    <HeaderItem title="Responsable" />
                                    <HeaderItem title="Cliente" />
                                    <HeaderItem title="Estado" />
                                    <HeaderItem title="Severidad" />
                                    <HeaderItem title="Acciones" />
                                </tr>
                                </thead>

                                <tbody>
                                {ticketsList.map((ticket) => (
                                    <TicketGridRow key={ticket['title']} ticket={ticket} />
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <br/>
                <div className="">
                        <button type="button"
                                onClick={handleNewTicketButton}
                                className="bg-amber-500 p-2 rounded-md font-semibold text-gray-900 hover:bg-amber-200"> Crear ticket </button>
                </div>
            </div>
        </>
    )
}
