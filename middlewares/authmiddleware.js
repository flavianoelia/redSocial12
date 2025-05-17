const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const authHeader = req.header("Authorization") 
    if (!authHeader) {
        return res.status(401).send({ message: "No hay token" });
    }
    // Extrae el token quitando el prefijo "Bearer " (si existe)
    const tokenExtracted = authHeader.startsWith ("Bearer")
        ? authHeader.replace("Bearer ", "").trim()
        : authHeader.trim();
    // Verifica si el token es valido y lo decodifica
    
    try {
        const verified = jwt.verify(tokenExtracted, process.env.JWT_SECRET);
        req.user = verified; // Guarda los datos decodificado
        next();
    } catch (error) {
        res.status(400).send({
            message: "token no valido",
            info: error.message
        });
    }

};

module.exports = auth;