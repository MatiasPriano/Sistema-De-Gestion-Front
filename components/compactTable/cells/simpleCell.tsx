export default function SimpleCell({ name, centered = false }: { name: string | number, centered?: boolean }) {
    return (
        <div className={centered ? "flex items-center justify-center": ""}>
            <div
                className="line-clamp-1 text-sm mx-2 text-title font-medium"
                title={name as string}>
                {name}
            </div>
        </div>
        
    )
}