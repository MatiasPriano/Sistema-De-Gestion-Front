import { useRouter } from 'next/router';

function ComboBox({ title, options, selected, disabled = false }: { title: string, options: string[], selected: string, disabled?: boolean }) {
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
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                    {options.map((option) => {
                    if (selected === option) {
                        return (
                            <option selected>{option}</option>
                        )
                    }
                    return (
                        <option>{option}</option>
                    )
                    })}
                </select>
            </div>
        </div>
    )
}

function create() {
    alert('Se crea un ticket');
}

export default function Ticket() {
    const stateOptions: string[] = ["Nuevo"]
    const severityOptions: string[] = ["S1", "S2", "S3", "S4"]

    const router = useRouter();
    const { version } = router.query;

    return (
        <div className="container max-w-7xl mx-auto mt-8 sm:mt-4">
            <div className="mb-4">
                <h1 className="text-3xl font-bold decoration-gray-400">Creacion de ticket</h1>
                <h2 className="text-xl decoration-gray-700">Producto: {version}</h2>
            </div>
            <form>
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
                                    name="title"
                                    id="title"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="TKT-001"
                                    style={{ paddingLeft: '10px', paddingRight: '10px' }}
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                    Descripcion
                                </label>
                                <div className="mt-2">
                                    <textarea
                                    id="about"
                                    name="about"
                                    rows={3}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    defaultValue={''}
                                    placeholder="El usuario describe que no puede descargar ultima factura emitida."
                                    style={{ paddingLeft: '10px', paddingRight: '10px' }}
                                    />
                                </div>
                            </div>
                            <div>
                                <ComboBox title="Estado" options={stateOptions} selected="Nuevo" disabled={true}/>
                                <div className="mt-4">
                                    <ComboBox title="Severidad" selected="S3" options={severityOptions}/>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="client" className="block text-sm font-medium leading-6 text-gray-900">
                                    Cliente
                                </label>
                                <div className="mt-2">
                                    <input
                                    type="text"
                                    name="client"
                                    id="client"
                                    className="block w-full md:w-72 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="PSA - Soporte"
                                    style={{ paddingLeft: '10px', paddingRight: '10px' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <a href={"/products/" + version + "/tickets/"}>
                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        Cancelar
                        </button>
                    </a>
                    <button
                    type="submit"
                    onClick={create}
                    className="rounded-md bg-blue-950 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                    Crear
                    </button>
                </div>
            </form>
        </div>
    )
}
