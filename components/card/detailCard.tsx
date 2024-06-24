interface DetailCardProps {
  mainContent: any;
  title: string;
  wide?: boolean;
  bottomColour?: string;
}

export default function DetailCard({
  mainContent,
  title,
  wide = false,
  bottomColour = "bg-gray-300",
}: DetailCardProps) {
  const width = wide ? "w-48" : "w-32";

  return (
    <div
      className={`overflow-hidden relative flex flex-col items-center rounded-lg shadow-md hover:shadow-lg h-32 ${width} border border-border bg-backgroundContainer transition duration-300 ease-in-out`}
      title={title}
    >
      <div className=" block flex flex-col items-center justify-center flex-grow pb-4">
        {mainContent}
      </div>
      <div
        className={`absolute bottom-0 left-0 right-0 h-2 ${bottomColour}`}
      ></div>
      <label className="text-sm absolute bottom-3 text-title font-medium">
        {title}
      </label>
    </div>
  );
}
