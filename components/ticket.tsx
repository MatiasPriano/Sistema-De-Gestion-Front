import React, { useState } from 'react';

interface ComboBoxProps {
    title: string;
    options: string[];
    selected: string;
    disabled?: boolean;
    onChange?: (selectedOption: string) => void;
}

function ComboBox({ title, options, selected, disabled = false, onChange }: ComboBoxProps) {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = event.target.value;
        if (onChange) {
            onChange(selectedOption);
        }
    };
    return (
        <div className="sm:col-span-3">
            <label htmlFor={title} className="block text-sm font-medium leading-6 text-gray-900">
                {title}
            </label>
            <div className="mt-2">
                <select
                disabled={disabled}
                id={title}
                name={title}
                onChange={handleChange}
                className={`block w-full rounded-md border-0 py-1.5 ${disabled ? 'text-gray-600' : 'text-gray-900'} shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6`}
                >
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

interface TicketProps {
    version: string;
    title?: string;
    responsable?: string;
    description?: string;
    state?: string;
    severity?: string;
    client?: string;
    titleDisabled?: boolean;
    responsableDisabled?: boolean;
    descriptionDisabled?: boolean;
    stateDisabled?: boolean;
    severityDisabled?: boolean;
    clientDisabled?: boolean;
    includeButtons?: boolean;
    mode: TicketMode;
}

export enum TicketMode {
    New, Edit, View
}

export default function Ticket({ version, title = '', responsable = '', description = '', state = 'Nuevo',
    severity = 'S1', client = '', titleDisabled = false, responsableDisabled = false,
    descriptionDisabled = false, stateDisabled = false, severityDisabled = false, clientDisabled = false,
    mode}: TicketProps) {
    const [formTitle, setFormTitle] = useState(title);
    const [formClient, setFormClient] = useState(client);
    const [formResponsable, setFormResponsable] = useState(responsable);
    const [formDescription, setFormDescription] = useState(description);
    const [formState, setFormState] = useState(state);
    const [formSeverity, setFormSeverity] = useState(severity);

    const [titleError, setTitleError] = useState<boolean>(false);
    const [descriptionError, setDescriptionError] = useState<boolean>(false);
    const [clientError, setClientError] = useState<boolean>(false);

    const stateOptions: string[] = ["Nuevo", "En progreso", "Esperando cliente", "Esperando desarrollo",
        "Resuelto esperando confirmacion", "Cerrado", "Bloqueado"
    ]
    const severityOptions: string[] = ["S1", "S2", "S3", "S4"]

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        if (formTitle.trim() && formClient.trim() && formResponsable.trim() && formDescription.trim() &&
            formState.trim() && formSeverity.trim()) {
                if (mode === TicketMode.New) {
                    alert('Se crea un ticket.');
                } else {
                    alert('Se edita un ticket.');
                }
            
        } else {
            if (!formTitle.trim()) {
                setTitleError(true)
            }
            if (!formDescription.trim()) {
                setDescriptionError(true)
            }
            if (!formClient.trim()) {
                setClientError(true)
            }
        }
    };

    const handleFocusTitle = () => {
        setTitleError(false)
    }
    const handleFocusDescription = () => {
        setDescriptionError(false)
    }
    const handleFocusClient = () => {
        setClientError(false)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                Titulo
                            </label>
                            <div className="mt-2">
                                <input
                                type="text"
                                value={formTitle}
                                onChange={(e) => setFormTitle(e.target.value)}
                                name="title"
                                id="title"
                                onFocus={handleFocusTitle}
                                className={`block w-full pl-2 pr-2 rounded-md border-0 py-1.5 ${titleDisabled ? 'text-gray-600' : 'text-gray-900'} shadow-sm ring-1 ring-inset ${titleError ? 'ring-red-500' : 'ring-gray-300'} placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                                placeholder="TKT-001"
                                disabled={titleDisabled}
                                />
                                <small className={`text-red-500 absolute mt-1 transition-opacity duration-300 ${titleError ? 'opacity-100' : 'opacity-0'}`}>Este campo es obligatorio.</small>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="responsable" className="block text-sm font-medium leading-6 text-gray-900">
                                Responsable {"(opcional)"}
                            </label>
                            <div className="mt-2">
                                <input
                                type="text"
                                value={formResponsable}
                                onChange={(e) => setFormResponsable(e.target.value)}
                                name="responsable"
                                id="responsable"
                                className={`block w-full rounded-md border-0 py-1.5 ${responsableDisabled ? 'text-gray-600' : 'text-gray-900'} shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                                placeholder="Juan Perez"
                                style={{ paddingLeft: '10px', paddingRight: '10px' }}
                                disabled={responsableDisabled}
                                />
                            </div>
                        </div>
                        <div className="col-span-full">
                            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                Descripcion
                            </label>
                            <div className="mt-2">
                                <textarea
                                value={formDescription}
                                onChange={(e) => setFormDescription(e.target.value)}
                                id="description"
                                name="description"
                                rows={3}
                                className={`block w-full pl-2 pr-2 rounded-md border-0 py-1.5 ${descriptionDisabled ? 'text-gray-600' : 'text-gray-900'} shadow-sm ring-1 ring-inset ${descriptionError ? 'ring-red-500' : 'ring-gray-300'} placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                                defaultValue={''}
                                onFocus={handleFocusDescription}
                                placeholder="El usuario describe que no puede descargar ultima factura emitida."
                                disabled={descriptionDisabled}
                                />
                                <small className={`text-red-500 absolute mt-1 transition-opacity duration-300 ${descriptionError ? 'opacity-100' : 'opacity-0'}`}>Este campo es obligatorio.</small>
                            </div>
                        </div>
                        <div>
                            <ComboBox   title="Estado"
                                        options={stateOptions}
                                        selected={formState}
                                        disabled={stateDisabled}
                                        onChange={setFormState}/>
                            <div className="mt-4">
                                <ComboBox   title="Severidad"
                                            selected={formSeverity}
                                            options={severityOptions}
                                            disabled={severityDisabled}
                                            onChange={setFormSeverity}/>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="client" className="block text-sm font-medium leading-6 text-gray-900">
                                Cliente
                            </label>
                            <div className="mt-2">
                                <input
                                value={formClient}
                                onChange={(e) => setFormClient(e.target.value)}
                                type="text"
                                name="client"
                                id="client"
                                onFocus={handleFocusClient}
                                className={`block w-full md:w-72 rounded-md border-0 py-1.5 ${clientDisabled ? 'text-gray-600' : 'text-gray-900'} shadow-sm ring-1 ring-inset ${clientError ? 'ring-red-500' : 'ring-gray-300'} placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                                placeholder="PSA - Soporte"
                                style={{ paddingLeft: '10px', paddingRight: '10px' }}
                                disabled={clientDisabled}
                                />
                                <small className={`text-red-500 absolute mt-1 transition-opacity duration-300 ${clientError ? 'opacity-100' : 'opacity-0'}`}>Este campo es obligatorio.</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {mode != TicketMode.View && (
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <a href={"/products/" + version + "/tickets/"}>
                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                            Cancelar
                        </button>
                    </a>
                    <button
                    type="submit"
                    className="rounded-md bg-blue-950 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                        {mode === TicketMode.New ? "Crear" : "Editar"}
                    </button>
                </div>)
            }
            
        </form>
    )
}
