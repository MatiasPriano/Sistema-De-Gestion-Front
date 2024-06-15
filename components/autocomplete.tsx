import { ReactSearchAutocomplete } from 'react-search-autocomplete'

function getSubtextClassName(isObligatory: boolean, isEmpty: boolean) {
    let className = "text-red-500 absolute transition-opacity duration-300";
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
    value: string;
    setValue: (value: string) => void;
    error?: boolean;
    handleFocus?: () => void;
    isObligatory: boolean;
    items: string[];
    disabled?: boolean;
}

export default function AutocompleteInput({
    title,
    placeholder, 
    value,
    setValue,
    error = false,
    isObligatory = false, 
    items,
    disabled = false
}: AutocompleteInputProps) {
    const handleOnSearch = (value: string, _: string[]) => {
        setValue(value)
    }
    const handleOnSelect = (value: string) => {
        setValue(value)
    }
    return (
        <div className="space-y-2">
            <label htmlFor="input" className="block text-sm font-medium text-gray-900">
                {title} {!isObligatory && "(opcional)"}
            </label>
            <div>
                {disabled && <div className="my-4 font-medium text-md">{value}</div>}
                {!disabled && <ReactSearchAutocomplete  items={items}
                                                        placeholder={placeholder}
                                                        onSearch={handleOnSearch}
                                                        onSelect={handleOnSelect}
                                                        styling={{
                                                            height: "44px",
                                                            border: "1px solid #dfe1e5",
                                                            borderRadius: "24px",
                                                            backgroundColor: "white",
                                                            boxShadow: "rgba(32, 33, 36, 0.28) 0px 1px 4px 0px",
                                                            hoverBackgroundColor: "#eee",
                                                            color: "#212121",
                                                            fontSize: "16px",
                                                            fontFamily: "Arial",
                                                            iconColor: "grey",
                                                            lineColor: "rgb(232, 234, 237)",
                                                            placeholderColor: "grey",
                                                            clearIconMargin: '3px 14px 0 0',
                                                            searchIconMargin: '0 0 0 16px'
                                                        }}/>}
                <small className={getSubtextClassName(isObligatory, error)}>Este campo es obligatorio.</small>
            </div>
        </div>
    );
}
