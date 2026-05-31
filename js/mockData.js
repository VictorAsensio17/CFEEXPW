// Datos de ejemplo para pruebas locales
const mockData = {
    events: [
        {
            id: 'EVT-001',
            title: 'Análisis del Mercado Post-Elecciones',
            type: 'DEBATE',
            date: '2026-05-24',
            location: 'Campus UEx',
            description: 'Análisis en profundidad del impacto de los resultados electorales en los mercados financieros',
            capacity: 60,
            registered: 45,
            featured: true
        },
        {
            id: 'EVT-002',
            title: 'Workshop: Introducción a Bloomberg Terminal',
            type: 'TALLER',
            date: '2026-06-02',
            location: 'Aula 5',
            description: 'Sesión práctica de Bloomberg Terminal con expertos del sector',
            capacity: 30,
            registered: 28
        },
        {
            id: 'EVT-003',
            title: 'Networking Dinner: C-Level Sessions',
            type: 'NETWORKING',
            date: '2026-06-15',
            location: 'Centro Histórico',
            description: 'Cena exclusiva con directivos de empresas financieras',
            capacity: 50,
            registered: 42,
            featured: true
        }
    ],

    resources: [
        {
            id: 'RES-001',
            title: 'El impacto de la IA en los modelos de valoración de activos',
            category: 'TECNOLOGÍA',
            author: 'Carlos Martínez',
            date: '2026-05-12',
            excerpt: 'Exploramos cómo los algoritmos de machine learning están redefiniendo el análisis técnico...',
            readTime: 8,
            views: 245
        },
        {
            id: 'RES-002',
            title: 'Perspectivas del BCE: Tipos de interés y control de inflación',
            category: 'MACROECONOMÍA',
            author: 'María García López',
            date: '2026-05-08',
            excerpt: 'Análisis de las últimas declaraciones de Christine Lagarde...',
            readTime: 12,
            views: 189
        },
        {
            id: 'RES-003',
            title: 'Criptoactivos: ¿Refugio de valor o burbuja especulativa?',
            category: 'MERCADOS',
            author: 'David Rodríguez',
            date: '2026-05-02',
            excerpt: 'Un debate profundo sobre la naturaleza de Bitcoin tras el último halving...',
            readTime: 10,
            views: 367
        }
    ],

    members: [
        {
            id: 'USR-001',
            name: 'Juan Pérez García',
            email: 'juan.perez@alumnos.unex.es',
            degree: 'Grado 3º',
            joinDate: '2025-09-15',
            role: 'Miembro',
            eventsAttended: 8
        },
        {
            id: 'USR-002',
            name: 'María López Rodríguez',
            email: 'maria.lopez@alumnos.unex.es',
            degree: 'Máster Finanzas',
            joinDate: '2025-10-01',
            role: 'Moderador',
            eventsAttended: 12
        },
        {
            id: 'USR-003',
            name: 'Carlos Martínez Sánchez',
            email: 'carlos.martinez@alumnos.unex.es',
            degree: 'Grado 2º',
            joinDate: '2025-11-05',
            role: 'Miembro',
            eventsAttended: 5
        }
    ],

    marketData: {
        ibex35: {
            value: 18436.70,
            change: 147.50,
            changePercent: 0.80,
            high: 18500.00,
            low: 18200.00,
            updatedAt: '2026-05-31T17:30:00Z'
        },
        sp500: {
            value: 7519.21,
            change: 45.12,
            changePercent: 0.61,
            high: 7550.00,
            low: 7480.00,
            updatedAt: '2026-05-31T21:30:00Z'
        },
        eurusd: {
            value: 1.1628,
            change: -0.0019,
            changePercent: -0.13,
            high: 1.1650,
            low: 1.1600,
            updatedAt: '2026-05-31T17:30:00Z'
        },
        dax: {
            value: 18124.50,
            change: 89.75,
            changePercent: 0.50,
            high: 18200.00,
            low: 18000.00,
            updatedAt: '2026-05-31T17:30:00Z'
        }
    },

    testimonials: [
        {
            name: 'Carlos Rodríguez',
            degree: 'Grado 3º ADE',
            text: 'El club me ha permitido conectar con profesionales del sector y aprender sobre inversión de forma práctica.',
            rating: 5
        },
        {
            name: 'Paula Fernández',
            degree: 'Máster Finanzas',
            text: 'Los talleres son de altísima calidad. He aprendido herramientas que no enseñan en las aulas.',
            rating: 5
        },
        {
            name: 'Diego López',
            degree: 'Grado 2º Economía',
            text: 'La comunidad es muy activa. He hecho amigos y contactos invaluables.',
            rating: 4
        }
    ],

    companies: [
        {
            name: 'BBVA',
            sector: 'Banca',
            logo: '🏦'
        },
        {
            name: 'Santander',
            sector: 'Banca',
            logo: '🏦'
        },
        {
            name: 'Telefónica',
            sector: 'Telecomunicaciones',
            logo: '📡'
        },
        {
            name: 'Inditex',
            sector: 'Retail',
            logo: '👕'
        }
    ]
};

// Función para obtener datos simulados
function getMockData(type) {
    return mockData[type] || null;
}

// Función para buscar en recursos
function searchResources(query) {
    return mockData.resources.filter(resource =>
        resource.title.toLowerCase().includes(query.toLowerCase()) ||
        resource.excerpt.toLowerCase().includes(query.toLowerCase())
    );
}

// Función para filtrar eventos por tipo
function filterEventsByType(type) {
    return mockData.events.filter(event => event.type === type);
}

// Función para filtrar eventos próximos
function getUpcomingEvents() {
    const today = new Date('2026-05-31');
    return mockData.events
        .filter(event => new Date(event.date) >= today)
        .sort((a, b) => new Date(a.date) - new Date(b.date));
}

// Función para simular envío de formulario
function submitFormMock(formType, formData) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                status: 'success',
                message: `Formulario de ${formType} enviado correctamente`,
                timestamp: new Date().toISOString(),
                data: formData
            });
        }, 1000);
    });
}

// Exportar si se usa como módulo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        mockData,
        getMockData,
        searchResources,
        filterEventsByType,
        getUpcomingEvents,
        submitFormMock
    };
}
