import {useEffect, useState} from "react";
import TicketGridRow from "@/components/ticketGridRow";

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


    return (
        <>
            {/* ACA EMPIEZA LA GRILLA */}
            <div className="container max-w-7xl mx-auto mt-8">
                <div className="mb-4">
                    <h1 className="text-3xl font-bold decoration-gray-400">Tickets</h1>
                </div>
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
                    <button type="button" onClick={create}
                        className="bg-amber-500 p-2 rounded-md font-semibold text-black hover:bg-amber-200"> Crear ticket </button>
                </div>
            </div>
        </>
    )
}
