import {useEffect, useState} from "react";
import { useRouter } from 'next/router';
import TicketGridRow from "@/components/ticketGridRow";
import VersionHeader from "@/components/versionHeader";

function HeaderItem({ title }: { title: string }) {
    return <th className="px-6 py-3 text-sm text-left text-gray-500 border-b border-gray-200 bg-gray-50">{title}</th>
}

export default function Tickets() {
    const [list, setList] = useState([])

    useEffect(() => {
       
    }, [])


    function create() {
        alert('Se crea un ticket');
    }

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
                                title="Ticket"
                />
                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                        <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
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
                                {list.map((ticket) => (
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
