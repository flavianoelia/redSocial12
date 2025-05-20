require('dotenv').config(); // Carga .env

module.exports = {
    development: {
        username: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "1234",
        database: process.env.DB_NAME || "db_final",
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT || "3306",
        dialect: "mysql"
    },
    production: {
        username: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "1234",
        database: process.env.DB_NAME || "db_final",
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT || "3306",
        dialect: "mysql"
    }
};