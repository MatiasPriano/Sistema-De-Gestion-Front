import { useRouter } from "next/router";
import productsList from "./productsMock";


export default function ProductGridRow({ product }: {product: any}) {

    const router = useRouter();
    const { idProduct, version } = router.query;

    const handleSeeAssociatedTickets = () => {
        router.push(`/products/${product['name']}/${product['version']}`)
    }

    return (
        <tr key={`${product['id']}`}>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 w-1/2">
                <div className="flex items-center font-medium">{product['name']}</div>
            </td>

            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 w-1/4">
                <div className="text-sm leading-5 font-medium">{product['version']}</div>
            </td>

            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 w-1/4">
                <div className="flex items-center justify-center">
                    <input type="image" src="https://img.icons8.com/?size=100&id=4907&format=png&color=000000" className="w-7 h-7"
                        onClick={handleSeeAssociatedTickets}></input>
                </div>
            </td>
        </tr>
    )
}
