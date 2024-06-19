import Ticket from "@/types/ticket";

const ticketsList: Ticket[] = [
    {
        id: 1,
        title: 'Falla botón emitir factura',
        createdDateTime: '12/06/2024',
        responsable: 'Gabriel Gutierrez',
        description: "Se reportó un problema con el botón de emisión de facturas que impide su funcionamiento adecuado.",
        client: 'iPlan',
        status: 'Nuevo',
        severity: 'S2'
    },
    {
        id: 2,
        title: 'Crear nueva etiqueta para diferencia tipo cliente',
        createdDateTime: '07/06/2024',
        responsable: 'Marcos Acosta',
        description: "Se requiere crear una nueva etiqueta que permita distinguir diferentes tipos de cliente de manera clara en el sistema.",
        client: 'Telecentro',
        status: 'En progreso',
        severity: 'S3'
    },
    {
        id: 3,
        title: 'Bug - factura se genera por duplicado',
        createdDateTime: '04/06/2024',
        responsable: 'Alex Luna',
        description: "Se identificó un bug en el sistema que está causando la generación duplicada de facturas.",
        client: 'Accenture',
        status: 'Cerrado',
        severity: 'S1'
    },
    {
        id: 4,
        title: "Rediseño del Sitio Web",
        createdDateTime: '10/06/2024',
        responsable: "Juan Pérez",
        description: "Rediseñar el sitio web de la empresa para mejorar la experiencia del usuario y modernizar el diseño.",
        status: "Esperando desarrollo",
        severity: "S4",
        client: "Empresa ABC",
    }
];

export default ticketsList;
