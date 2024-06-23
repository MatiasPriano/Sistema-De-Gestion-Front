import SimpleCell from "../cells/simpleCell";
import ActionsCell, { Action } from "../cells/actionsCell";
import { useRouter } from "next/router";
import Version from "@/types/version";

export default function VersionRow({ version }: { version: Version }) {
    const router = useRouter()
    const handleViewVersionClick = () => {
        router.push(`/versions/${version.product.id}/${version.id}`)
    }
    const handleCreateTicketClick = () => {
        router.push(`/versions/${version.product.id}/${version.id}/new`)
    }
    
    const actions: Action[] = [
        {
            icon: "view",
            onClick: handleViewVersionClick,
            title: "Ver producto"
        },
        {
            icon: "create",
            onClick: handleCreateTicketClick,
            title: "Crear un ticket"
        }
    ]
    
    return (
        <tr key={version.name} >
            <td className="overflow-hidden">
                <SimpleCell name={version.product.name} />
            </td>
            <td className="overflow-hidden">
                <SimpleCell name={version.name} centered={true} />
            </td>
            <td className="overflow-hidden">
                <ActionsCell actions={actions}/>
            </td>
        </tr>
        
    );
}

