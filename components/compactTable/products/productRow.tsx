import SimpleCell from "../cells/simpleCell";
import Product from "@/types/product";
import ActionsCell, { Action } from "../cells/actionsCell";

export default function ProductRow({ product }: { product: Product }) {
    const actions: Action[] = [
        {
            icon: "view",
            link: `/products/${product.name}/${product.version}`,
            title: "Ver producto"
        },
        {
            icon: "create",
            link: `/products/${product.name}/${product.version}/new`,
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

