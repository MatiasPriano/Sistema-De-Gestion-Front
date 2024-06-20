function getInputClassName(isDisabled: boolean, isObligatory: boolean, isEmpty: boolean) {
    let className = 'block w-full pl-2 pr-2 rounded-md border border-border py-2 placeholder:text-placeholder hover:shadow-lg focus:shadow-lg sm:text-sm focus:outline-none'
    if (isDisabled) {
        className += ' text-subtitle'
    } else {
        className += ' text-title'
    }

    if (isEmpty && isObligatory) {
        className += ' ring-red'
    } else {
        className += ' ring-border'
    }
    
    return className
}

function getSubtextClassName(isObligatory: boolean, isEmpty: boolean) {
    let className = "text-red absolute transition-opacity duration-300";
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
    setValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
    error?: boolean;
    handleFocus?: () => void;
    isRequired: boolean;
    disabled?: boolean;
}

export default function Input({ title, placeholder, value, setValue, error = false, handleFocus, isRequired: isObligatory = false, disabled = false}: InputProps) {
    return (
        <div className="space-y-2">
            {title && <label htmlFor="input" className="block text-sm font-medium text-title">
                {title} {(!isObligatory && " (opcional)")}
            </label>}
            <div>
                <input
                type="text"
                value={value}
                onChange={setValue}
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