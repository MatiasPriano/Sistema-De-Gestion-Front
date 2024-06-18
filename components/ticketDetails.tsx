import Ticket from "@/types/ticket";
import DetailCard from "./card/detailCard";

type Colour = "red" | "orange" | "yellow" | "green"

const coloursMap: Record<Colour, string> = {
    red: "bg-red-500",
    orange: "bg-orange-500",
    yellow: "bg-yellow-500",
    green: "bg-green-500"
};

const severityColours: Record<"S1" | "S2" | "S3" | "S4", Colour> = {
    "S1": "red",
    "S2": "orange",
    "S3": "yellow",
    "S4": "green"
}

export default function TicketDetails({ ticket }: { ticket: Ticket }) {
    return (
        <div className="px-4 py-8 space-y-8 rounded-xl border border-blue-950 overflow-hidden">
            <div className="flex items-center">
                <h1 className="text-4xl font-bold text-gray-900 font-sans line-clamp-1">{ticket.title}</h1>
                <h2 className="text-black mx-4 text-2xl text-gray-600">
                    {"#" + ticket.id}
                </h2>
            </div>
            
            <hr/>
            <div className="flex justify-start space-x-4">
                <DetailCard
                    mainContent={
                        <div>
                            <h1 className={`flex items-center justify-center text-2xl font-extrabold text-black ${coloursMap[severityColours[ticket.severity]]} w-12 h-12 rounded-2xl`}>
                                {ticket.severity}
                            </h1>
                        </div>
                    }
                    title={"Severidad"} />
                <DetailCard
                    mainContent={
                        <h1 className=" text-center text-xl font-extrabold text-blue-500 flex items-center justify-center px-4">
                            {ticket.status}
                        </h1>
                    }
                    title="Estado" />
                <DetailCard
                    mainContent={
                        <div className="text-center text-xl font-extrabold text-white flex items-center justify-center bg-blue-950 p-2 rounded-xl mx-2">
                            <div className="line-clamp-2 word-wrap">
                                {ticket.client}
                            </div>
                        </div>
                    }
                    title="Cliente"
                    wide={true} />
                <DetailCard
                    mainContent={
                        <div className="text-center text-xl font-extrabold text-gray-900 flex items-center justify-center px-4">
                            <div className="line-clamp-3 word-wrap">
                                {ticket.responsable}
                            </div>
                        </div>
                    }
                    title="Responsable"
                    wide={true} />
            </div>
            <hr/>
            <p className="mx-8">
                {ticket.description}
            </p>
        </div>
    )
}