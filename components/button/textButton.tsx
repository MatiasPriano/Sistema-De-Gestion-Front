interface CustomButtonProps {
    name: string
    type?: "button" | "submit" | "reset"
    style?: "primary" | "secondary" | "subtle"
    onClick?: () => void
    disabled?: boolean
}

export default function TextButton ({ name, type = "button", style = "primary", onClick, disabled = false }: CustomButtonProps) {
    let className: string = "rounded-md px-3 py-2 text-sm font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-colors duration-300 ease-in-out"
    if (style === "primary") {
        className += " bg-blue-950 disabled:bg-gray-300 text-white disabled:text-gray-900 hover:bg-blue-800"
    } else if (style === "secondary") {
        className += " bg-amber-500 disabled:bg-gray-300 text-gray-900 hover:bg-amber-200"
    } else {
        className += " bg-white text-gray-900 disabled:text-gray-500 hover:text-gray-600"
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