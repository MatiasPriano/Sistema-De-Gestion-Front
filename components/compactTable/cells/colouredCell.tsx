export type ColouredCellColours = "red" | "orange" | "yellow" | "green"

const coloursMap = {
    red: "bg-red",
    orange: "bg-orange",
    yellow: "bg-yellow",
    green: "bg-green"
  };

export default function ColouredCell({ name, colour } : { name: string, colour: ColouredCellColours}) {
    let className = 'text-sm text-title font-bold rounded-md px-5 mx-5 py-1 my-1 flex items-center justify-center '
    className += coloursMap[colour]
    return (
        <div className={" flex items-center justify-center"}>
            <div className={className}>{name}</div>
        </div>
    )
}
