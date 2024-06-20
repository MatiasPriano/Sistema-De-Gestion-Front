
export interface ButtonOption {
    title: string;
    colour: Colour;
}

type Colour = "red" | "orange" | "yellow" | "green"

const coloursMap = {
    red: { selected: "bg-redAlternative", notSelected: "bg-redSubtle"},
    orange: { selected: "bg-orangeAlternative", notSelected: "bg-orangeSubtle" },
    yellow: { selected: "bg-yellowAlternative", notSelected: "bg-yellowSubtle" },
    green: { selected: "bg-greenAlternative", notSelected: "bg-greenSubtle"}
};
  

export default function ButtonRow({ title, options, selected, setSelected, isRequired = false, error, handleFocus, disabled = false }: 
    {   title: string,
        options: ButtonOption[],
        selected: string | null,
        setSelected: (selected: string | null) => void,
        isRequired?: boolean,
        error: boolean,
        handleFocus: () => void,
        disabled?: boolean
    }) {   
    const handleOptionChange = (option: string) => {
        setSelected(option)
    }
    return (
        <div className="flex flex-col items-center space-y-2">
            <label htmlFor={title} className="text-sm font-medium text-title">
                {title} {(!isRequired && " (opcional)")}
            </label>
            <div className="w-full">
                <div className="flex overflow-hidden rounded-md border border-border shadow-md hover:shadow-lg">
                    {options.map((option, index) => (
                        <div className="w-full" key={index}>
                            <button type="button"
                                    key={index}
                                    disabled={disabled}
                                    className={getOptionButtonClassName(option.colour, option.title === selected, disabled)}
                                    onFocus={handleFocus}
                                    onClick={() => handleOptionChange(option.title)}>
                                {option.title}
                            </button>
                        </div>
                    ))}
                </div>
                <small className={getSubtextClassName(isRequired, error)}>Este campo es obligatorio.</small>
            </div>
        </div>
    )
}

function getOptionButtonClassName (colour: Colour, isSelected: boolean, isDisabled: boolean) {
    let className = `w-full h-10 text-subtitle`
    if (isDisabled) {
        className += " bg-white"
    } else if (isSelected) {
        className += ` ${coloursMap[colour].selected}`
    } else {
        className += ` ${coloursMap[colour].notSelected}`
    }
    if (isSelected) {
        className += ` font-bold`
    } else {
        className += ` font-normal`
    }
    return className
};

function getSubtextClassName(isObligatory: boolean, isEmpty: boolean) {
    let className = "text-red absolute mt-1 transition-opacity duration-300";
    if (isEmpty && isObligatory) {
        className += ' opacity-100'
    } else {
        className += ' opacity-0'
    }
    return className
}