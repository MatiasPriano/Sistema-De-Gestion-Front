import Ticket from "@/types/ticket";
import DetailCard from "./card/detailCard";

type Colour = "red" | "orange" | "yellow" | "green";

const bgColoursMap: Record<Colour, string> = {
    red: "bg-red-500",
    orange: "bg-orange-500",
    yellow: "bg-yellow-500",
    green: "bg-green-500",
};

const severityColours: Record<"S1" | "S2" | "S3" | "S4", Colour> = {
    "S1": "red",
    "S2": "orange",
    "S3": "yellow",
    "S4": "green",
};

export default function TicketDetails({ ticket }: { ticket: Ticket }) {
    return (
        <div className="px-4 py-8 space-y-4 sm:space-y-8 rounded-xl border border-blue-950 bg-white overflow-hidden">
            <div className="flex items-center">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-sans">{ticket.title}</h1>
                <h2 className="text-black mx-4 text-2xl text-gray-600">{"#" + ticket.id}</h2>
            </div>
            <hr />
            <div className="flex flex-wrap justify-center gap-2">
                <DetailCard
                    mainContent={
                        <div>
                            <h1 className={`text-center text-2xl font-extrabold text-black flex items-center justify-center w-12 h-12 rounded-2xl ${bgColoursMap[severityColours[ticket.severity]]}`}>{ticket.severity}</h1>
                        </div>
                    }
                    title={"Severidad"}
                    bottomColour={bgColoursMap[severityColours[ticket.severity]]} />
                <DetailCard
                    mainContent={
                        <h1 className="text-center text-xl font-extrabold text-indigo-400 flex items-center justify-center px-4">{ticket.status}</h1>
                    }
                    title="Estado"
                    bottomColour="bg-indigo-400" />
                <DetailCard
                    mainContent={
                        <div className="text-center text-xl font-extrabold text-teal-400 flex items-center justify-center p-2">
                            <div className="line-clamp-2 word-wrap">{ticket.client}</div>
                        </div>
                    }
                    title="Cliente"
                    wide={true}
                    bottomColour="bg-teal-400" />
                <DetailCard
                    mainContent={
                        <div className="text-center text-xl font-extrabold text-pink-300 flex items-center justify-center px-4">
                            <div className="line-clamp-2 word-wrap">{ticket.responsable}</div>
                        </div>
                    }
                    title="Responsable"
                    wide={true}
                    bottomColour="bg-pink-300" />
            </div>
            <hr />
            <p className="mx-2 sm:mx-8">{ticket.description}</p>
        </div>
    );
}
