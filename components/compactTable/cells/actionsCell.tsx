import IconButton, { ButtonIcon } from "@/components/button/iconButton"

export interface Action {
    icon: ButtonIcon
    onClick: () => void
    title: string
}

export default function ActionsCell({ actions } : { actions: Action[] }) {
    return (
        <div className={"flex flex-row items-center justify-center space-x-1"}>
            {actions.map((action) => (
                <IconButton
                    icon={action.icon}
                    title={action.title}
                    style="subtle"
                    onClick={action.onClick} />
            ))}
        </div>
    )
}