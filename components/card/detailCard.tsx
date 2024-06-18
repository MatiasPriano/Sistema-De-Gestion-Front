interface DetailCardProps {
    mainContent: any;
    title: string;
    wide?: boolean;
}

export default function DetailCard({ mainContent, title, wide = false }: DetailCardProps) {
    const width = wide ? "w-48" : "w-32"
    return (
        <div className={`relative flex flex-col items-center justify-center rounded-xl ${width} h-32 border border-transparent hover:border-amber-500 transition duration-300 ease-in-out`}>
            <div className="flex flex-col items-center justify-center flex-grow pb-4">
                {mainContent}
            </div>
            <label className="text-sm absolute bottom-2">{title}</label>
        </div>
    );
}
