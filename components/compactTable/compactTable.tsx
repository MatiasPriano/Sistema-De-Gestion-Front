export default function CompactTable({ headerTitles, rows }: { headerTitles: string[], rows: any[] }) {
    return (
        <div className='rounded-xl border border-blue-950 overflow-x-auto'>
            <table className="min-w-full table-fixed">
                <thead>
                    <tr>
                        {headerTitles.map((headerTitle, index) =>
                            <th
                                key={index}
                                className="px-6 py-2 text-sm text-white bg-blue-950">
                                    {headerTitle}
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>
    )
}
