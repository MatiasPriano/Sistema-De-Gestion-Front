
export interface ButtonChoice {
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
  

export default function ButtonRow({ title, choices, selectedChoice, setSelected, isObligatory = false, error, handleFocus, disabled = false }: 
    {   title: string,
        choices: ButtonChoice[],
        selectedChoice: string | null,
        setSelected: (newSelectedChoice: string | null) => void,
        isObligatory?: boolean,
        error: boolean,
        handleFocus: () => void,
        disabled?: boolean
    }) {   
    const handleChoiceChange = (choice: string) => {
        setSelected(choice)
    }
    console.log(selectedChoice)
    return (
        <div className="flex flex-col items-center space-y-2">
            <label htmlFor="input" className="text-sm font-medium text-gray-900">
                {title} {(!isObligatory && " (opcional)")}
            </label>
            <div className="w-full">
                <div className="flex overflow-hidden rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300">
                    {choices.map((choice, index) => (
                        <div className="w-full" key={index}>
                            <button type="button"
                                    key={index}
                                    disabled={disabled}
                                    className={getChoiceButtonClassName(choice.colour, choice.title === selectedChoice, disabled)}
                                    onFocus={handleFocus}
                                    onClick={() => handleChoiceChange(choice.title)}>
                                {choice.title}
                            </button>
                        </div>
                    ))}
                </div>
                <small className={getSubtextClassName(isObligatory, error)}>Este campo es obligatorio.</small>
            </div>
        </div>
    )
}

function getChoiceButtonClassName (colour: Colour, isSelected: boolean, isDisabled: boolean) {
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