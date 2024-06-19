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
        <div className="w-full space-y-2">
            <label htmlFor={title} className="block text-sm font-medium text-title">
                {title}
            </label>
            <div>
                <select
                disabled={disabled}
                id={title}
                name={title}
                onChange={handleChange}
                className={`w-full pl-2 pr-2 rounded-md border-0 py-2 ${disabled ? 'text-subtitle' : 'text-title'} ring-1 ring-inset ring-border focus:ring-2 focus:ring-inset hover:shadow-lg focus:shadow-lg`}>
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