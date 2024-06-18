import Ticket from "@/types/ticket";

const ticketsList: Ticket[] = [
        {
            id: 1,
            title: 'Falla botón emitir factura',
            createdDateTime: '12/06/2024',
            responsable: 'Gabriel Gutierrez',
            description: "",
            client: 'iPlan',
            status: 'Nuevo',
            severity: 'S2'
        },
        {
            id: 2,
            title: 'Crear nueva etiqueta para diferencia tipo cliente',
            createdDateTime: '07/06/2024', 
            responsable: 'Marcos Acosta',
            description: "",
            client: 'Telecentro',
            status: 'En progreso',
            severity: 'S3'
        },
        {
            id: 3,
            title: 'Bug - factura se genera por duplicado',
            createdDateTime: '04/06/2024',
            responsable: 'Alex Luna',
            description: "",
            client: 'Accenture',
            status: 'Cerrado',
            severity: 'S1'
        },
    ]

export default ticketsList;

//QUITAR LUEGO