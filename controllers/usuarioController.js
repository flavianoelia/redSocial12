const db = require('../models');
const Usuario = db.Usuario;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const register = async(req, res) => {
    const { nombre, mail, nickname, password } = req.body;
    if (!nombre || !mail || !nickname || !password) {
        return res.status(400).send({ message: "Faltan datos de completar" });
    }
    try {     
        const usuario = await Usuario.create({
            nombre,
            mail,
            nickname,
            password //pasa la contraseña en texto plano, el hook la encriptará
        });
        res.status(201).send(usuario);
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            res.status(400).send({ message: "Mail o nickname ya existente" });
        } else {
            res.status(500).send({
                message: error.message,
                nombre: error.name
            });
        }
    }
};

const update = async(req, res) => {
    try {
        const id = req.user.id;
        const { nombre, nickname, mail, password } = req.body;
        let avatarPath = null;
        if (req.file) {
            avatarPath = `uploads/avatars/${req.file.filename}`
        }
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).send({ error: 'Usuario no encontrado' });
        }
        // Actualizar los campos
        usuario.nombre = nombre || usuario.nombre;
        usuario.nickname = nickname || usuario.nickname;
        usuario.mail = mail || usuario.mail;
        if (password) {
            usuario.password = password ? await bcrypt.hash(password, 10) : usuario.password; // El hook beforeUpdate lo encriptará solo si se envía
        }
        if (avatarPath) {
            usuario.avatar = avatarPath; 
        }
        await usuario.save(); 
        res.status(200).send(usuario);
    } catch (error) {
        res.status(500).send({ error: 'Error al actualizar usuario', details: error.message });
    }
};

const list = async(req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // obtiene el número de página de la consulta, por defecto 1
        const limit = parseInt(req.query.limit) || 1; // obtiene el límite de elementos por página de la consulta, por defecto 1

        if (page < 1 || limit < 1) { // verifica que los valores de página y límite sean positivos
            return res.status(400).send({
                message: "Page and limit must be positive"
            })
        }

        const offset = (page - 1) * limit; // calcula el desplazamiento (offset) para la consulta

        const { count, rows } = await Usuario.findAndCountAll({
            attributes: { exclude: ['password'] }, //Escluye el campo 'password' de los resultados
            limit: limit, // establece el límite de elementos por página
            offset: offset // establece el desplazamiento (offset) para la consulta
        });

        res.status(200).send({
            totalItems: count, // total de elementos en la base de datos
            totalPages: Math.ceil(count / limit), // total de páginas
            currentPage: page, // página actual
            itemsPerPage: limit, // elementos por página
            data: rows // datos de los usuarios
        })

    } catch (error) {
        res.status(500).send(error.message);
    }
}

const login = async(req, res) => {
    const { mail, password } = req.body;
    try {
        const usuario = await Usuario.findOne({ where: { mail } });
        if (!usuario) {
            return res.status(404).send({ message: "Usuario no encontrado" });
        }
        const isMatch = await bcrypt.compare(password, usuario.password);
        if (!isMatch) {
            return res.status(400).send({ message: "Password incorrecto" });
        }
        // Crear token (guarda id, nombre y mail)
        const token = jwt.sign({
            id: usuario.id,
            nombre: usuario.nombre,
            mail: usuario.mail
        }, process.env.JWT_SECRET, { expiresIn: "1d" }); // acá es donde creo el token utilizando la clave secreta de la variable de entorno
        res.status(200).send({ token });
    } catch (error) {
        res.status(500).send({
            message: "Error en el servidor",
            tipo: error.name,
            detalles: error.message
        });
    }
}

module.exports = { // exporta las siguientes funciones para q puedan ser utilizadas en otros archivos del proyecto
    register,
    update,
    list,
    login
};