export default function CompactTable({ headerTitles, rows }: { headerTitles: string[], rows: any[] }) {
    return (
        <div className='rounded-xl bg-backgroundContainer overflow-x-auto shadow-md border border-border'>
            <table className="min-w-full table-fixed">
                <thead>
                    <tr>
                        {headerTitles.map((headerTitle, index) =>
                            <th
                                key={index}
                                className="px-6 py-2 text-sm text-darkTitle bg-primary">
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
