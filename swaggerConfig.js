const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "API de Usuarios",
            version: "1.0.0",
            description: "Documentación de la API de Usuarios",
        },
        servers: [{
            url: "http://localhost:3000/api",
            description: "Servidor local",
        }],
        components: {
            securitySchemes: {
                ApiTokenAuth: {
                    type: "apiKey",
                    in: "header",
                    name: "Authorization", // Usa 'Authorization' para que puedas escribir el token sin prefijo
                },
            },
        },
        security: [{
            ApiTokenAuth: [], // Define ApiTokenAuth como seguridad por defecto
        }],
        tags: [  // Etiquetas para organizar los endpoints en Swagger UI
            { name: "Usuarios", description: "Gestión de usuarios" },
            { name: "Following", description: "Gestión de relaciones de seguimiento" },
            { name: "Posts", description: "Gestión de publicaciones" },
        ],
    },
    apis: ["./routes/*.js"], // Ruta a tus archivos de rutas
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
module.exports = swaggerDocs