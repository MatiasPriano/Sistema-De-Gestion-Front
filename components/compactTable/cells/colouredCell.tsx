export type ColouredCellColours = "red" | "orange" | "yellow" | "green"

const coloursMap = {
    red: "bg-red-500",
    orange: "bg-orange-500",
    yellow: "bg-yellow-500",
    green: "bg-lime-500"
  };

export default function ColouredCell({ name, colour } : { name: string, colour: ColouredCellColours}) {
    let className = 'text-sm text-gray-200 font-bold rounded-md px-5 mx-5 py-1 my-1 text-gray-900 flex items-center justify-center '
    className += coloursMap[colour]
    return (
        <div className={" flex items-center justify-center"}>
            <div className={className}>{name}</div>
        </div>
    )
}
