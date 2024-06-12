function getInputClassName(isDisabled: boolean, isObligatory: boolean, isEmpty: boolean) {
    let className = 'block w-full pl-2 pr-2 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
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
    let className = "text-red-500 absolute mt-1 transition-opacity duration-300";
    if (isEmpty && isObligatory) {
        className += ' opacity-100'
    } else {
        className += ' opacity-0'
    }
    return className
}

interface InputProps {
    title: string;
    placeholder: string;
    value: string;
    setValue: (value: string) => void;
    error?: boolean;
    handleFocus?: () => void;
    isObligatory: boolean;
    disabled?: boolean;
}

export default function Input({ title, placeholder, value, setValue, error = false, handleFocus, isObligatory = false, disabled = false}: InputProps) {
    return (
        <div>
            <label htmlFor="input" className="block text-sm font-medium leading-6 text-gray-900">
                {title} {(!isObligatory && " (opcional)")}
            </label>
            <div className="mt-2">
                <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                name="input"
                id="input"
                onFocus={handleFocus}
                className={getInputClassName(disabled, isObligatory, error)}
                placeholder={placeholder}
                disabled={disabled}
                />
                <small className={getSubtextClassName(isObligatory, error)}>Este campo es obligatorio.</small>
            </div>
        </div>
    )
}