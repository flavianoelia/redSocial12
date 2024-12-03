const db = require('../models');
const Following = db.Following;
const Usuario = db.Usuario

const follow = async (req, res) => { // para crear la nueva relación de seguimiento
    const id_usuario = req.user.id; // toma de middleware el id del usuario autenticado
    const { id_usuario_seguido } = req.body; //para extraer el id del cuerpo de la solicitud

    if (id_usuario === id_usuario_seguido) { //condición para q no pueda seguirse s si mismo
        return res.status(400).send({ message: "No puedes seguirte a ti mismo" });
    }

    try {

        // Verificar si el usuario seguido existe primero
        const usuarioSeguido = await Usuario.findByPk(id_usuario_seguido, {
            attributes: ['id', 'nombre', 'nickname']
        });
        if (!usuarioSeguido) {
            return res.status(404).send({ message: "El usuario no existe" });
        }
        //crear la relación de seguimiento
        await Following.create({ id_usuario, id_usuario_seguido }); // crea un nuevo registro de following

        //respuesta con la información del usuario seguido
        return res.status(201).send({ message: "Has comenzado a seguir al usuario ", usuarioSeguido });
    } catch (error) {
        if(error.name === "SequelizeUniqueConstraintError"){
            return res.status(401).send({message: "Ya sigues a este usuario"});
        }
        return res.status(500).send({ 
            error: error.message,
            tipo: error.name 
        });
    }
};

// Obtener la lista de usuarios que el usuario sigue
const getFollowing = async(req, res) => {
    const id_usuario = req.user.id;

    try {
        const usuario = await db.Usuario.findByPk(id_usuario, {
            include: [{
                model: db.Usuario,
                as: 'seguidos', // Usa la relación "seguidos"
                attributes: ['id', 'nombre', 'nickname'],
                through: {
                    attributes: [] } // No incluir datos innecesarios del pivot
            }],
        });

        if (!usuario) {
            return res.status(404).send({ error: 'Usuario no encontrado' });
        }

        if (usuario.seguido.length === 0) {
            return res.status (404).send({message: "No hay usuarios seguidos"})
        }
        // si la respuesta es exitosa con los usuarios seguidos
        return res.status(200).send(usuario.seguidos); // Enviar solo los usuarios seguidos
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};




module.exports = {
    follow,
    getFollowing
};