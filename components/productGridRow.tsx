import { useRouter } from "next/router";

interface ProductGridRowProps {
    name: string;
    version: string;
}

export default function ProductGridRow({ product }: {product: ProductGridRowProps}) {

    const router = useRouter();
    const { productName, version } = router.query;

    const handleSeeAssociatedTickets = () => {
        router.push(`/products/${product.name}/${product.version}`)
    }

    const handleNewTicketButton = () => {
        router.push(`/products/${product.name}/${product.version}/new`)
    }

    return (
        <tr key={`${product.name}`} className="h-10 hover:bg-blue-100">
            <td className="px-2 py-3 w-2/4">
                <div className="flex items-center">
                    <div className="text-s font-medium text-gray-900 max-w-xs">
                        <div className="truncate">{product.name}</div>
                    </div>
                </div>
            </td>

            <td className="px-2 py-3 w-1/6">
                <div className="flex items-center justify-center">
                    <div className="text-s font-medium text-gray-900 max-w-xs">
                        {product.version}
                    </div>
                </div>
            </td>

            <td className="px-2 py-3 w-1/6">
                <div className="flex items-center justify-center">
                    <button type="button" onClick={handleSeeAssociatedTickets} className="relative text-black hover:text-blue-600">
                        <svg className="w-7 h-7 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" 
                                height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 3v4a1 1 0 0 1-1 1H5m8 7.5 2.5 2.5M19 4v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Zm-5 9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"/>
                        </svg>
                    </button>
                </div>
            </td>

            <td className="px-2 py-3 w-1/4">
                <div className="flex items-center justify-center">
                    <button type="button" onClick={handleNewTicketButton} 
                            className="bg-amber-500 relative text-black hover:text-blue-600 hover:bg-amber-200 rounded-md px-2 border">
                        <svg className="w-7 h-7" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" 
                                width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9V4a1 1 0 0 0-1-1H8.914a1 1 0 0 0-.707.293L4.293 7.207A1 1 0 0 0 4 7.914V20a1 1 0 0 0 1 1h4M9 3v4a1 1 0 0 1-1 1H4m11 6v4m-2-2h4m3 0a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z"/>
                        </svg>
                    </button>
                </div>
            </td>
        </tr>
    )
}
