import { useRouter } from "next/router";

export default function TicketGridRow({ ticket }: {ticket: any}) {

    const router = useRouter();
    const { product, version, ticketId } = router.query;

    const handleViewTicket = () => {
        router.push(`/products/${product}/${version}/${ticket.id}`)
    }

    const handleEditTicket = () => {
        router.push(`/products/${product}/${version}/${ticket.id}/edit`)
    }


    return (
        <tr key={`${ticket['title']}`} className="hover:bg-blue-100">
            <td className="px-2 py-3">
                <div className="flex items-center">{ticket['title']}</div>
            </td>

            <td className="px-2 py-3">
                <div className="flex items-center justify-center">{ticket['createdDateTime']}</div>
            </td>

            <td className="px-2 py-3">
                <div className="flex items-center justify-center">{ticket['assignee']}</div>
            </td>

            <td className="px-2 py-3">
                <div className="flex items-center justify-center">{ticket['client']}</div>
            </td>

            <td className="px-2 py-3">
                <div className="flex items-center justify-center">{ticket['state']}</div>
            </td>

            <td className="px-2 py-3">
                <div className="flex items-center justify-center">{ticket['severity']}</div>
            </td>

            <td className="px-2 py-3">
                <div className="flex justify-center">
                    <div className="flex items-center px-1">
                        <button type="button" onClick={handleViewTicket} className="relative text-black hover:text-blue-600">
                            <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M9 7V2.221a2 2 0 0 0-.5.365L4.586 6.5a2 2 0 0 0-.365.5H9Zm2 0V2h7a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9h5a2 2 0 0 0 2-2Zm.5 5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm0 5c.47 0 .917-.092 1.326-.26l1.967 1.967a1 1 0 0 0 1.414-1.414l-1.817-1.818A3.5 3.5 0 1 0 11.5 17Z" clip-rule="evenodd"/>
                            </svg>
                        </button>
                    </div>
                    <div className="flex items-center">
                        <button type="button" onClick={handleEditTicket} className="relative text-black hover:text-blue-600">
                            <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M8 7V2.221a2 2 0 0 0-.5.365L3.586 6.5a2 2 0 0 0-.365.5H8Zm2 0V2h7a2 2 0 0 1 2 2v.126a5.087 5.087 0 0 0-4.74 1.368v.001l-6.642 6.642a3 3 0 0 0-.82 1.532l-.74 3.692a3 3 0 0 0 3.53 3.53l3.694-.738a3 3 0 0 0 1.532-.82L19 15.149V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9h5a2 2 0 0 0 2-2Z" clip-rule="evenodd"/>
                                <path fill-rule="evenodd" d="M17.447 8.08a1.087 1.087 0 0 1 1.187.238l.002.001a1.088 1.088 0 0 1 0 1.539l-.377.377-1.54-1.542.373-.374.002-.001c.1-.102.22-.182.353-.237Zm-2.143 2.027-4.644 4.644-.385 1.924 1.925-.385 4.644-4.642-1.54-1.54Zm2.56-4.11a3.087 3.087 0 0 0-2.187.909l-6.645 6.645a1 1 0 0 0-.274.51l-.739 3.693a1 1 0 0 0 1.177 1.176l3.693-.738a1 1 0 0 0 .51-.274l6.65-6.646a3.088 3.088 0 0 0-2.185-5.275Z" clip-rule="evenodd"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </td>
        </tr>
    )
}
