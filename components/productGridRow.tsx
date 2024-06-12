import { useRouter } from "next/router";
import productsList from "./productsMock";

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

    return (
        <tr key={`${product.name}`} className="h-10">
            <td className="px-2 py-3 w-1/4">
                <div className="flex items-center">
                    <div className="text-s font-medium text-gray-900 max-w-xs">
                        <div className="truncate">{product.name}</div>
                    </div>
                </div>
            </td>

            <td className="px-2 py-3 w-1/4">
                <div className="flex items-center justify-center">
                    <div className="text-s font-medium text-gray-900 max-w-xs">
                        {product.version}
                    </div>
                </div>
            </td>

            <td className="px-2 py-3 w-1/4">
                <div className="flex items-center justify-center">
                    <input type="image" src="https://img.icons8.com/?size=100&id=4907&format=png&color=000000" className="w-7 h-7"
                        onClick={handleSeeAssociatedTickets}></input>
                </div>
            </td>
        </tr>
    )
}
