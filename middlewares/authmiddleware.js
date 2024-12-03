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


module.exports = auth;