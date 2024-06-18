interface DetailCardProps {
    mainContent: any;
    title: string;
    wide?: boolean;
}

export default function DetailCard({ mainContent, title, wide = false }: DetailCardProps) {
    const width = wide ? "w-48" : "w-32";

    return (
        <div className={`overflow-hidden relative flex flex-col items-center justify-center rounded-xl ${width} h-32 border border-gray-200 transition duration-300 ease-in-out hover:border-t hover:border-r hover:border-l hover:border-blue-950`}>
            <div className=" block flex flex-col items-center justify-center flex-grow pb-4">
                {mainContent}
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-300"></div>
            <label className="text-sm absolute bottom-3">{title}</label>
        </div>
    );
}
