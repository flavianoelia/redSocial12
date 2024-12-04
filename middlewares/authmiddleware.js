/*
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const authHeader = req.header("Authorization");
    // Verificar si existe el token
    if (!authHeader) {
        return res.status(401).send({ message: "No hay token" });
    }
    // eliminar el prefijo 'Bearer' si esta presente
    const token = authHeader.startsWith("Bearer") ? authHeader.slice(7) : authHeader;
    // decodificarlo
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; //guarda los datos decodificados de token
        next();
    } catch (error) {
        res.status(400).send({
            message: "token no valido",
            info: error.message
        });
    }
};
*/

const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const authHeader = req.header("Authorization")?.trim(); // Limpia espacios extra
    if (!authHeader) {
        return res.status(401).send({ message: "No hay token" });
    }

    // Eliminar el prefijo 'Bearer ' si está presente y limpiar comillas
    const token = authHeader.startsWith("Bearer ")
        ? authHeader.slice(7).replace(/"/g, "").trim() // Remueve comillas dobles
        : authHeader.replace(/"/g, "").trim();

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Guarda los datos decodificados del token
        next();
    } catch (error) {
        res.status(400).send({
            message: "token no valido",
            info: error.message,
        });
    }
};


module.exports = auth;