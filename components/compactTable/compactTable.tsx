function HeaderItem({ title }: { title: string }) {
    return <th className="px-6 py-2 text-sm text-white bg-blue-950">{title}</th>
}

export default function CompactTable({ headerTitles, rows }: { headerTitles: string[], rows: any[] }) {
    return (
        <div className='rounded-xl border border-blue-950 overflow-hidden'>
            <table className="table-fixed">
                <thead>
                    {headerTitles.map((headerTitle) =>
                        <HeaderItem title={headerTitle}/>
                    )}
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>
    )
}
