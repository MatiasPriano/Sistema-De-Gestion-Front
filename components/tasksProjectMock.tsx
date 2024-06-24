import TaskProject from "@/types/taskProjects";

const tasksList: TaskProject[] = [
    {
        id: 1,
        title: "Modificar el monto de una cuota",
        responsable: "",
        project: "Sistema UPP - 2024",
        status: "OPEN",
        priority: "LOW",
        maxTimeResolution: "string",
        startDate: "string",
        endDate: "string",
        description: "Se necesita realizar una modificación en el monto de una cuota dentro del sistema UPP 2024. La tarea involucra ajustar los cálculos y asegurar la precisión de los registros financieros asociados. Esto incluye revisar las fórmulas de cálculo actuales, coordinar con el equipo de contabilidad para validar los cambios propuestos y documentar adecuadamente todas las actualizaciones realizadas. Además, se deberá realizar pruebas exhaustivas para verificar que los cambios implementados no afecten la integridad de otros procesos del sistema. El objetivo final es garantizar que la modificación sea precisa y transparente para todos los usuarios del sistema."
    },    
    {
        id: 2,
        title: "Implementar autenticación de dos factores",
        responsable: "",
        project: "Plataforma de Gestión Interna",
        status: "OPEN",
        priority: "HIGH",
        maxTimeResolution: "string",
        startDate: "string",
        endDate: "string",
        description: "Se requiere implementar un sistema de autenticación de dos factores (2FA) para mejorar la seguridad de acceso a la plataforma de gestión interna. Esto incluye integrar métodos de verificación adicionales para los usuarios."
    },
    {
        id: 3,
        title: "Optimizar consultas de base de datos",
        responsable: "",
        project: "Sistema de Informes Gerenciales",
        status: "CLOSED",
        priority: "MEDIUM",
        maxTimeResolution: "string",
        startDate: "string",
        endDate: "string",
        description: "Se solicita optimizar las consultas de la base de datos del sistema de informes gerenciales para mejorar el rendimiento y reducir el tiempo de respuesta. Esto implica revisar y ajustar las consultas SQL existentes."
    },
    {
        id: 4,
        title: "Desarrollar un módulo de análisis predictivo",
        responsable: "",
        project: "Plataforma de Business Intelligence",
        status: "OPEN",
        priority: "HIGH",
        maxTimeResolution: "string",
        startDate: "string",
        endDate: "string",
        description: "Se necesita desarrollar un nuevo módulo de análisis predictivo para la plataforma de Business Intelligence. El objetivo es incorporar capacidades de predicción y recomendación basadas en análisis de datos históricos y actuales."
    },
    {
        id: 5,
        title: "Actualizar la documentación del API",
        responsable: "",
        project: "Servicio de Integración Externa",
        status: "OPEN",
        priority: "MEDIUM",
        maxTimeResolution: "string",
        startDate: "string",
        endDate: "string",
        description: "Es necesario revisar y actualizar la documentación del API del servicio de integración externa para asegurar que esté completa, precisa y fácil de entender para los desarrolladores externos que lo utilizan."
    },
    {
        id: 6,
        title: "Revisar y mejorar la interfaz de usuario",
        responsable: "",
        project: "Aplicación Móvil de Cliente",
        status: "CLOSED",
        priority: "HIGH",
        maxTimeResolution: "string",
        startDate: "string",
        endDate: "string",
        description: "Se requiere una revisión completa y mejora de la interfaz de usuario de la aplicación móvil de cliente. Esto incluye optimizar la navegación, mejorar la usabilidad y actualizar el diseño visual para cumplir con las expectativas actuales de los usuarios."
    },
    {
        id: 7,
        title: "Implementar sistema de notificaciones push",
        responsable: "",
        project: "Plataforma de Gestión de Eventos",
        status: "CLOSED",
        priority: "MEDIUM",
        maxTimeResolution: "string",
        startDate: "string",
        endDate: "string",
        description: "Se solicita implementar un sistema de notificaciones push en la plataforma de gestión de eventos para informar a los usuarios sobre actualizaciones importantes en tiempo real. Esto incluye configurar integraciones con servicios de notificación push."
    },
    {
        id: 8,
        title: "Auditar la seguridad del servidor",
        responsable: "",
        project: "Infraestructura de TI",
        status: "CLOSED",
        priority: "HIGH",
        maxTimeResolution: "string",
        startDate: "string",
        endDate: "string",
        description: "Es necesario realizar una auditoría completa de seguridad en el servidor de la infraestructura de TI para identificar posibles vulnerabilidades y aplicar medidas correctivas según las mejores prácticas de seguridad informática."
    },
    {
        id: 9,
        title: "Crear un sistema de gestión de incidencias",
        responsable: "",
        project: "Soporte Técnico",
        status: "OPEN",
        priority: "MEDIUM",
        maxTimeResolution: "string",
        startDate: "string",
        endDate: "string",
        description: "Se necesita desarrollar un sistema de gestión de incidencias para el equipo de soporte técnico. Esto incluye diseñar y implementar una plataforma que permita registrar, priorizar y resolver problemas reportados por los usuarios."
    },
    {
        id: 10,
        title: "Integrar nuevo método de pago",
        responsable: "",
        project: "Plataforma de E-Commerce",
        status: "OPEN",
        priority: "HIGH",
        maxTimeResolution: "string",
        startDate: "string",
        endDate: "string",
        description: "Se requiere integrar un nuevo método de pago en la plataforma de E-Commerce para ofrecer más opciones a los clientes durante el proceso de compra. Esto implica coordinar con proveedores de servicios de pago externos."
    },
    {
        id: 11,
        title: "Optimizar el rendimiento del servidor web",
        responsable: "",
        project: "Servidores de Producción",
        status: "OPEN",
        priority: "HIGH",
        maxTimeResolution: "string",
        startDate: "string",
        endDate: "string",
        description: "Se solicita optimizar el rendimiento del servidor web en los servidores de producción para garantizar tiempos de carga rápidos y una experiencia fluida para los usuarios finales. Esto incluye configurar ajustes de cache y monitorear el uso de recursos."
    },
    {
        id: 12,
        title: "Desarrollar un sistema de recomendaciones personalizadas",
        responsable: "",
        project: "Plataforma de Contenido",
        status: "CLOSED",
        priority: "MEDIUM",
        maxTimeResolution: "string",
        startDate: "string",
        endDate: "string",
        description: "Se necesita desarrollar un sistema de recomendaciones personalizadas para la plataforma de contenido. El objetivo es mejorar la experiencia del usuario al sugerir contenido relevante basado en sus preferencias y comportamientos pasados."
    },
    {
        id: 13,
        title: "Migrar base de datos a la nube",
        responsable: "",
        project: "Infraestructura de Datos",
        status: "OPEN",
        priority: "HIGH",
        maxTimeResolution: "string",
        startDate: "string",
        endDate: "string",
        description: "Se requiere planificar y ejecutar la migración de la base de datos actual a una solución en la nube. Esto incluye evaluar proveedores, diseñar la arquitectura de la base de datos en la nube y asegurar la integridad de los datos durante la migración."
    },
    {
        id: 14,
        title: "Redactar políticas de seguridad de la información",
        responsable: " Torres",
        project: "Gobierno Corporativo",
        status: "CLOSED",
        priority: "MEDIUM",
        maxTimeResolution: "string",
        startDate: "string",
        endDate: "string",
        description: "Es necesario redactar políticas de seguridad de la información que establezcan directrices claras y procedimientos para proteger los activos de información críticos de la organización contra amenazas internas y externas."
    },
    {
        id: 15,
        title: "Implementar sistema de gestión de documentos",
        responsable: "",
        project: "Transformación Digital",
        status: "CLOSED",
        priority: "MEDIUM",
        maxTimeResolution: "string",
        startDate: "string",
        endDate: "string",
        description: "Se solicita implementar un sistema de gestión de documentos digitales para facilitar el almacenamiento, búsqueda y acceso eficiente a documentos en la organización. Esto incluye seleccionar y configurar una plataforma adecuada."
    }
];

export default tasksList;