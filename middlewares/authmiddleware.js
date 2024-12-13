const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    // const token = req.header("Authorization")?.replace(/"/g, "").trim(); // Quita comillas y espacios
    const token = req.header("Authorization"); // sin limpiar comillas ni espacios
    // Verificar si existe el token
    if (!token) {
        return res.status(401).send({ message: "No hay token" });
    }
    // decodificarlo
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Guarda los datos decodificado
        next();
    } catch (error) {
        res.status(400).send({
            message: "token no valido",
            info: error.message
        })
    }

}

module.exports = auth;