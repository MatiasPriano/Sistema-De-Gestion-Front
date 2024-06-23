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
    let className = 'block w-full pl-2 pr-2 rounded-md border border-border py-1.5 placeholder:text-placeholder hover:shadow-lg focus:shadow-lg transition-colors duration-300 ease-in-out focus:outline-none'
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

export default function TextArea({ title, value, setValue, placeholder = "", isRequired: isObligatory = false, error = false, handleFocus, disabled = false }: TextAreaProps) {
    return (
        <div className="space-y-2">
            <label htmlFor="textArea" className="text-sm font-medium text-title">
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