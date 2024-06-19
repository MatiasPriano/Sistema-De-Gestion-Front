interface TextButtonProps {
    name: string
    type?: "button" | "submit" | "reset"
    style?: "primary" | "secondary" | "subtle" | "red"
    onClick?: () => void
    disabled?: boolean
}

export default function TextButton ({ name, type = "button", style = "primary", onClick, disabled = false }: TextButtonProps) {
    let className: string = "rounded-md px-3 py-2 text-sm font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-colors duration-300 ease-in-out"
    if (style === "primary") {
        className += " bg-primary disabled:bg-backgroundAccent text-darkTitle disabled:text-title hover:bg-primaryHover"
    } else if (style === "secondary") {
        className += " bg-secondary disabled:bg-backgroundAccent text-title hover:bg-secondaryHover"
    } else if (style === "subtle") {
        className += " bg-background text-title disabled:text-subtitle hover:text-subtitle"
    } else {
        className += " bg-red disabled:bg-subtitle text-background disabled:text-title hover:bg-redHover"
    }
    
    return (
        <button
            title={name}
            type={type}
            onClick={onClick}
            className={className}
            disabled={disabled}>
            {name}
        </button>
    )
}