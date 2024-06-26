import Ticket from "@/types/ticket";
import DetailCard from "./card/detailCard";
import Employee from "@/types/employee";
import { statusToPrintable } from "@/types/status";

type Colour = "red" | "orange" | "yellow" | "green";

const bgColoursMap: Record<Colour, string> = {
  red: "bg-red",
  orange: "bg-orange",
  yellow: "bg-yellow",
  green: "bg-green",
};

const severityColours: Record<"S1" | "S2" | "S3" | "S4", Colour> = {
  S1: "red",
  S2: "orange",
  S3: "yellow",
  S4: "green",
};

export default function TicketDetails({ ticket }: { ticket: Ticket }) {
  return (
    <div className="px-4 py-8 space-y-4 sm:space-y-8 rounded-xl shadow-lg border border-border bg-backgroundContainer overflow-hidden">
      <div className="flex items-center">
        <h1
          className="text-2xl sm:text-3xl font-bold text-title font-sans"
          title={ticket.title}
        >
          {ticket.title}
        </h1>
        <h2 className="text-black mx-4 text-2xl text-subtitle">
          {"#" + ticket.id}
        </h2>
      </div>
      <hr className="text-primary" />
      <div className="flex flex-wrap justify-center gap-2">
        <DetailCard
          mainContent={
            <div>
              <h1
                className={`text-center text-2xl font-extrabold text-black flex items-center justify-center w-12 h-12 rounded-2xl ${bgColoursMap[severityColours[ticket.severity]]}`}
              >
                {ticket.severity}
              </h1>
            </div>
          }
          title={"Severidad"}
          bottomColour={bgColoursMap[severityColours[ticket.severity]]}
        />
        <DetailCard
          mainContent={
            <h1 className="text-center text-xl font-extrabold text-indigo-400 flex items-center justify-center px-4">
              {statusToPrintable(ticket.status)}
            </h1>
          }
          title="Estado"
          wide={true}
          bottomColour="bg-indigo-400"
        />
        <DetailCard
          mainContent={
            <div className="text-center text-xl font-extrabold text-teal-400 flex items-center justify-center p-2">
              <div className="line-clamp-2 word-wrap">
                {ticket.client["razon social"]}
              </div>
            </div>
          }
          title="Cliente"
          wide={true}
          bottomColour="bg-teal-400"
        />
        <DetailCard
          mainContent={
            <div className="text-center text-xl font-extrabold text-pink-300 flex items-center justify-center px-4">
              <div className="line-clamp-2 word-wrap">
                {getEmployeeName(ticket.employee)}
              </div>
            </div>
          }
          title="Responsable"
          wide={true}
          bottomColour="bg-pink-300"
        />
      </div>
      <hr />
      <p className="mx-2 sm:mx-8 text-title">{ticket.description}</p>
    </div>
  );
}

function getEmployeeName(employee: Employee | null) {
  if (employee) {
    return employee.Nombre + " " + employee.Apellido;
  } else {
    return "No definido";
  }
}
