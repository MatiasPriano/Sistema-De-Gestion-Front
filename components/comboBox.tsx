interface ComboBoxProps {
    title: string;
    options: string[];
    selected: string;
    disabled?: boolean;
    onChange?: (selectedOption: string) => void;
}

export default function ComboBox({ title, options, selected, disabled = false, onChange }: ComboBoxProps) {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = event.target.value;
        if (onChange) {
            onChange(selectedOption);
        }
    };
    return (
        <div className="space-y-2">
            <label htmlFor={title} className="block text-sm font-medium text-gray-900">
                {title}
            </label>
            <div>
                <select
                disabled={disabled}
                id={title}
                name={title}
                onChange={handleChange}
                className={`block pl-2 pr-2 rounded-md border-0 py-2 ${disabled ? 'text-gray-600' : 'text-gray-900'} shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6`}>
                    {options.map((option) => {
                    if (selected === option) {
                        return (
                            <option key={option} value={option} selected>{option}</option>
                        )
                    }
                    return (
                        <option key={option} value={option}>{option}</option>
                    )
                    })}
                </select>
            </div>
        </div>
    )
}