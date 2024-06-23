import { ReactSearchAutocomplete } from 'react-search-autocomplete'

function getSubtextClassName(isObligatory: boolean, isEmpty: boolean) {
    let className = "text-red absolute transition-opacity duration-300";
    if (isEmpty && isObligatory) {
        className += ' opacity-100'
    } else {
        className += ' opacity-0'
    }
    return className
}

interface AutocompleteInputProps {
    title: string;
    placeholder: string;
    value: number | null;
    setValue: (value: number | null) => void;
    error?: boolean;
    errorText?: string;
    handleFocus?: () => void;
    isRequired: boolean;
    items: {id: number, name: string }[];
    disabled?: boolean;
}

export default function AutocompleteInput({
    title,
    placeholder, 
    value,
    setValue,
    error = false,
    errorText = "",
    isRequired = false, 
    items,
    disabled = false,
}: AutocompleteInputProps) {
    const handleOnSearch = (value: string, results: { id: number, name: string }[]) => {
        if (results.length === 0) setValue(null)
        else {
            let matches = results.filter((result) => result.name === value)
            if (matches.length === 0) setValue(null)
            else setValue(matches[0].id)
        }
    }
    const handleOnSelect = (value: { id: number, name: string }) => {
        setValue(value.id)
    }
    return (
        <div className="space-y-2">
            <label htmlFor={title} className="block text-sm font-medium text-title">
                {title} {!isRequired && "(opcional)"}
            </label>
            <div>
                {disabled && <div className="my-4 font-medium text-bold text-title">{value}</div>}
                {!disabled &&
                    <ReactSearchAutocomplete
                        items={items}
                        placeholder={placeholder}
                        onSearch={handleOnSearch}
                        onSelect={handleOnSelect}/>}
                <small className={getSubtextClassName(isRequired, error)}>{errorText}</small>
            </div>
        </div>
    );
}
