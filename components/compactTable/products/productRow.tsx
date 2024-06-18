import SimpleCell from "../cells/simpleCell";
import Product from "@/types/product";
import ActionsCell, { Action } from "../cells/actionsCell";
import { useRouter } from "next/router";

export default function ProductRow({ product }: { product: Product }) {
    const router = useRouter()
    const handleViewProductClick = () => {
        router.push(`/products/${product.name}/${product.version}`)
    }
    const handleCreateTicketClick = () => {
        router.push(`/products/${product.name}/${product.version}/new`)
    }
    
    const actions: Action[] = [
        {
            icon: "view",
            onClick: handleViewProductClick,
            title: "Ver producto"
        },
        {
            icon: "create",
            onClick: handleCreateTicketClick,
            title: "Crear un ticket"
        }
    ]
    
    return (
        <tr key={product.name} >
            <td className="overflow-hidden">
                <SimpleCell name={product.name} />
            </td>
            <td className="overflow-hidden">
                <SimpleCell name={product.version} centered={true} />
            </td>
            <td className="overflow-hidden">
                <ActionsCell actions={actions}/>
            </td>
        </tr>
        
    );
}

