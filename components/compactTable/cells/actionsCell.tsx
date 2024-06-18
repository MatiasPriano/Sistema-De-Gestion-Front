import IconButton, { ButtonIcon } from "@/components/button/iconButton"
import Link from "next/link"

export interface Action {
    icon: ButtonIcon
    link: string
    title: string
}

export default function ActionsCell({ actions } : { actions: Action[] }) {
    return (
        <div className={"flex flex-row items-center justify-center space-x-1"}>
            {actions.map((action) => (
                <Link href={action.link}>
                    <IconButton
                        icon={action.icon}
                        title={action.title}
                        style="subtle" />
                </Link>
            ))}
        </div>
    )
}
