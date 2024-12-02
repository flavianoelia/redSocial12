const db = require('../models');
const Following = db.Following;

const follow = async (req, res) => {
    const id_usuario = req.user.id;
    const { id_usuario_seguido } = req.body;    

    if (id_usuario == id_usuario_seguido) {
        return res.status(400).send({ message: "No puedes seguirte a ti mismo" });
    }

    try {
        await Following.create({ id_usuario, id_usuario_seguido });
        res.status(201).send({ message: "Has comenzado a seguir al usuario" });
    } catch (error) {
        if(error.name === "SequelizeUniqueConstraintError"){
            res.status(401).send({message: "Ya sigues a este usuario"});
        }
        else{
            res.status(500).send({ 
                error: error.message,
                tipo: error.name 
            });
        }
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
            }, ],
        });

        if (!usuario) {
            return res.status(404).send({ error: 'Usuario no encontrado' });
        }

        res.status(200).send(usuario.seguidos); // Enviar solo los usuarios seguidos
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};




module.exports = {
    follow,
    getFollowing
};