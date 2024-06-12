import React, { useState } from 'react';

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

interface AutocompleteInputProps {
    title: string;
    placeholder: string;
    value: string;
    setValue: (value: string) => void;
    error?: boolean;
    handleFocus?: () => void;
    isObligatory: boolean;
    suggestions: string[];
    handleSuggestions: (input: string) => void;
    disabled?: boolean;
}

export default function AutocompleteInput({
    title,
    placeholder, 
    value, 
    setValue, 
    error = false, 
    handleFocus = () => {}, 
    isObligatory = false, 
    suggestions, 
    handleSuggestions,
    disabled = false
}: AutocompleteInputProps) {
    const [showSuggestions, setShowSuggestions] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setValue(inputValue);
        handleSuggestions(inputValue);
    };

    return (
        <div>
            <label htmlFor="input" className="block text-sm font-medium leading-6 text-gray-900">
                {title} {!isObligatory && "(opcional)"}
            </label>
            <div className="mt-2 relative">
                <input
                    type="text"
                    value={value}
                    onChange={handleChange}
                    onFocus={() => {
                        setShowSuggestions(true);
                        handleFocus();
                    }}
                    name="input"
                    id="input"
                    className={getInputClassName(disabled, isObligatory, error)}
                    placeholder={placeholder}
                    disabled={disabled}
                />
                {showSuggestions && !disabled && (
                    <ul className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-300">
                        {suggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                                onClick={() => {
                                    setValue(suggestion)
                                    console.log(suggestion)
                                    setShowSuggestions(false)
                                }}
                            >
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                )}
                <small className={getSubtextClassName(isObligatory, error)}>Este campo es obligatorio.</small>
            </div>
        </div>
    );
}
