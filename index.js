// importación de módulos
const express = require("express"); // importa el framework express para crear el servidor
const bodyParser = require("body-parser"); // el middleware body-parser para parsear el cuerpo de las solicitudes

const swaggerUi = require("swagger-ui-express"); //importa Swagger
const swaggerDocs = require("./swaggerConfig"); // impora Swagger para la documentación de la API
const path = require("path"); //importa el módulo path para trabajar con rutas de archivos y directorios
const cors = require("cors"); // importa el middleware cors para permitir solicitudes desde cualquier origen

// importación de rutas
const usuarioRouter = require("./routes/usuarioRoutes");// importa las rutas para manejar usuarios
const followingRouter = require("./routes/followingRoutes"); // importa las rutas para manejar relaciones de seguimiento
const postRouter = require("./routes/postRoutes"); // importa las rutas para manejar publicaciones

// Configuración de variables de entorno
require('dotenv').config(); // importa el módulo dotenv para cargar variables de entorno desde un archivo .env

//inicialización de la aplicación express
const app = express(); // crea una instancia de la aplicación express
const PORT = process.env.PORT || 3000; // define el puerto en el que correrá el servidor

// inicia el servidor en el puerto especificado y muestra un mensaje en la consola indicando en la consola que el servidor esta corriendo
const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
//manejo del error de puerto ocupado
server.on("error", (error) => {
    if (error.code === "EADDRINUSE") {
        console.error(`El puerto ${PORT} está ocupado. Probando el puerto ${PORT + 1}`);
        app.listen(PORT + 1, () => {
            console.log(`Servidor iniciado en el puerto ${PORT + 1}`);
        });
    } else {
        console.error("Error desconocido:", error);
    }
});

// Middlewares
app.use(cors()); // Permite solicitudes desde cualquier origen
app.use(bodyParser.json()); // parsear el cuerpo de las solicitudes como JSON
app.use(express.urlencoded({ extended: true })); // parsear datos de formularios
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs)); //configura la ruta para la documentación de Swagger
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // sirve archivos estáticos desde el directorio uploads
//Rutas
app.use("/api/usuarios", usuarioRouter); // configura la ruta para manejar usuarios
app.use("/api/followings", followingRouter); // configura la ruta para manejar relaciones de seguimiento
app.use("/api/posts", postRouter); // configura la ruta para manejar publicaciones



/*
// Ya no uso estas lineas de código porque agregué un manejo de error si el puerto esta ocupado
app.listen(PORT, () => { // reemplazado por server.on
    console.log(`Aplicación corriendo en puerto ${PORT}`);
})
*/