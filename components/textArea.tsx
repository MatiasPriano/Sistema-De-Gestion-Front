interface TextAreaProps {
    title: string;
    value: string;
    setValue: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
    placeholder?: string;
    isRequired?: boolean;
    error?: boolean;
    handleFocus?: () => void;
    disabled?: boolean;
}

function getTextAreaClassName(isDisabled: boolean, isObligatory: boolean, isEmpty: boolean) {
    let className = 'block w-full pl-2 pr-2 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus:ring-opacity-50 transition-colors duration-300 ease-in-out'
    if (isDisabled) {
        className += ' text-gray-600'
    } else {
        className += ' text-gray-900'
    }

    if (isEmpty && isObligatory) {
        className += ' ring-red-500'
    } else {
        className += ' ring-gray-300'
    }
    
    return className
}

function getSubtextClassName(isObligatory: boolean, isEmpty: boolean) {
    let className = "text-red-500 absolute transition-opacity duration-300";
    if (isEmpty && isObligatory) {
        className += ' opacity-100'
    } else {
        className += ' opacity-0'
    }
    return className
}

export default function TextArea({ title, value, setValue, placeholder = "", isRequired: isObligatory = false, error = false, handleFocus, disabled = false }: TextAreaProps) {
    return (
        <div className="space-y-2">
            <label htmlFor="textArea" className="text-sm font-medium text-gray-900">
                {title} {!isObligatory && "(opcional)"}
            </label>
            <div>
                <textarea
                value={value}
                onChange={setValue}
                id="textArea"
                name="textArea"
                rows={3}
                className={getTextAreaClassName(disabled, isObligatory, error)}
                defaultValue={''}
                onFocus={handleFocus}
                placeholder={placeholder}
                disabled={disabled}
                />
                <small className={getSubtextClassName(isObligatory, error)}>Este campo es obligatorio.</small>
            </div>
        </div>
    )
}