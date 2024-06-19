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
    value: string;
    setValue: (value: string) => void;
    error?: boolean;
    errorText?: string;
    handleFocus?: () => void;
    isRequired: boolean;
    items: string[];
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
    disabled = false
}: AutocompleteInputProps) {
    const handleOnSearch = (value: string, _: string[]) => {
        setValue(value)
    }
    const handleOnSelect = (value: string) => {
        setValue(value)
    }
    const newItems:{ id: number, name: string }[] = []
    for (let i = 0; i < items.length; i++) {
        newItems.push({id: i, name: items[i]})
    }
    return (
        <div className="space-y-2">
            <label htmlFor="input" className="block text-sm font-medium text-title">
                {title} {!isRequired && "(opcional)"}
            </label>
            <div>
                {disabled && <div className="my-4 font-medium text-bold text-title">{value}</div>}
                {!disabled && <ReactSearchAutocomplete  items={newItems}
                                                        placeholder={placeholder}
                                                        onSearch={handleOnSearch}
                                                        onSelect={handleOnSelect}
                                                        styling={{
                                                            height: "44px",
                                                            border: "1px solid #dfe1e5",
                                                            borderRadius: "24px",
                                                            backgroundColor: "white",
                                                            boxShadow: "rgba(32, 33, 36, 0.28) 0px 1px 4px 0px",
                                                            hoverBackgroundColor: "#ffffff",
                                                            color: "#212121",
                                                            fontSize: "16px",
                                                            fontFamily: "Arial",
                                                            iconColor: "grey",
                                                            lineColor: "rgb(232, 234, 237)",
                                                            placeholderColor: "grey",
                                                            clearIconMargin: '3px 14px 0 0',
                                                            searchIconMargin: '0 0 0 16px'
                                                        }}/>}
                <small className={getSubtextClassName(isRequired, error)}>{errorText}</small>
            </div>
        </div>
    );
}
