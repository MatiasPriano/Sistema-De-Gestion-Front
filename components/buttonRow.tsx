
export interface ButtonOption {
    title: string;
    colour: Colour;
}

type Colour = "red" | "orange" | "yellow" | "green"

const coloursMap = {
    red: "bg-red-100",
    orange: "bg-orange-100",
    yellow: "bg-yellow-100",
    green: "bg-green-100"
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
            <label htmlFor="input" className="text-sm font-medium text-gray-900">
                {title} {(!isRequired && " (opcional)")}
            </label>
            <div className="w-full">
                <div className="flex overflow-hidden rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300">
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
    let className = `w-full h-10 text-gray-600`
    if (isDisabled) {
        className += " bg-transparent"
    } else {
        className += ` ${coloursMap[colour]}`
    }
    if (isSelected) {
        className += ` font-bold`
    } else {
        className += ` font-normal`
    }
    return className
};

function getSubtextClassName(isObligatory: boolean, isEmpty: boolean) {
    let className = "text-red-500 absolute mt-1 transition-opacity duration-300";
    if (isEmpty && isObligatory) {
        className += ' opacity-100'
    } else {
        className += ' opacity-0'
    }
    return className
}