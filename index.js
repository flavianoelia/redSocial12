const express = require("express");
const bodyParser = require("body-parser");

const swaggerUi = require("swagger-ui-express"); //Para swagger
const swaggerDocs = require("./swaggerConfig"); // Para swagger
const path = require("path");

const usuarioRouter = require("./routes/usuarioRoutes");
const followingRouter = require("./routes/followingRoutes");
const postRouter = require("./routes/postRoutes");

const cors = require("cors");

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
//manejo l error de puerto ocupado
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
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs)); //Ruta swagger
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
//Rutas
app.use("/api/usuarios", usuarioRouter); // maneja usuarios
app.use("/api/followings", followingRouter); // maneja relaciones de seguimiento
app.use("/api/posts", postRouter); // maneja publicaciones

app.use(cors()); // Permite solicitudes desde cualquier origen


/*
// Ya no uso estas lineas de código porque agregué un manejo de error si el puerto esta ocupado
app.listen(PORT, () => { // reemplazado por server.on
    console.log(`Aplicación corriendo en puerto ${PORT}`);
})
*/