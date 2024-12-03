const db = require("../models");
const Post = db.Post;

const createPost = async (req, res) => {
    const id_usuario = req.user.id; // Usuario autenticado
    const { titulo, contenido } = req.body;

    try {
        const post = await db.Post.create({ id_usuario, titulo, contenido });
        res.status(201).send(post);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const listPosts = async (req, res) => {
    try {
        const posts = await db.Post.findAll({
            include: {
                model: db.Usuario,
                attributes: ['id', 'nombre', 'nickname'],
            },
        });
        res.status(200).send(posts);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const updatePost = async (req, res) => {
    const id_usuario = req.user.id; // Usuario autenticado
    const { id } = req.params; // ID del post
    const { titulo, contenido } = req.body;

    try {
        const post = await db.Post.findOne({ where: { id, id_usuario } });

        if (!post) {
            return res.status(404).send({ message: "Publicación no encontrada o no autorizada" });
        }

        post.titulo = titulo || post.titulo;
        post.contenido = contenido || post.contenido;

        await post.save();
        res.status(200).send(post);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const deletePost = async (req, res) => {
    const id_usuario = req.user.id; // Usuario autenticado
    const { id } = req.params; // ID del post

    try {
        const post = await db.Post.findOne({ where: { id, id_usuario } });

        if (!post) {
            return res.status(404).send({ message: "Publicación no encontrada o no autorizada" });
        }

        await post.destroy();
        res.status(200).send({ message: "Publicación eliminada" });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const getPost = async (req, res) => {
    const { id } = req.params; // ID del post
    const id_usuario = req.user.id; // Usuario autenticado

    try {
        const post = await db.Post.findOne({
            where: { id },
            include: {
                model: db.Usuario,
                attributes: ['id', 'nombre', 'nickname'],
            },
        });

        if (!post) {
            return res.status(404).send({ message: "Publicación no encontrada" });
        }

        // Verificar si el post pertenece al usuario o a alguien seguido
        const isOwner = post.id_usuario === id_usuario;
        const isFollowed = await db.Following.findOne({
            where: { id_usuario: id_usuario, id_usuario_seguido: post.id_usuario },
        });

        if (!isOwner && !isFollowed) {
            return res.status(403).send({ message: "No tienes permiso para ver esta publicación" });
        }

        res.status(200).send(post);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

const getUserPosts = async (req, res) => {
    const { id } = req.params; // ID del usuario
    const id_usuario = req.user.id; // Usuario autenticado

    try {
        // Verificar si sigo al usuario
        const isFollowed = await db.Following.findOne({
            where: { id_usuario, id_usuario_seguido: id },
        });

        if (!isFollowed) {
            return res.status(403).send({ message: "No tienes permiso para ver estas publicaciones" });
        }

        const posts = await db.Post.findAll({
            where: { id_usuario: id },
        });

        res.status(200).send(posts);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

module.exports ={

}