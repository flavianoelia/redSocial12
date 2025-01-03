/*
const parameters = { // Parametros de configuración de la base de datos
    username: "root", // Nombre de usuario de la base de datos
    password: "1234", // Contraseña de la base de datos
    database: "db_final", // Nombre de la base de datos
    host: "localhost", // Host de la base de datos
    dialect: "mysql", // Dialecto de la base de datos
};
*/

const parameters = {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "1234",
    database: process.env.DB_NAME || "db_final",
    host: process.env.DB_HOST || "db",
    port: process.env.DB_PORT || "3306",
    dialect: "mysql",
};
module.exports = parameters;