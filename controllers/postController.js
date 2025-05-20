const db = require("../models");
const Post = db.Post;

const createPost = async (req, res) => {
    const id_usuario = req.user.id; // Usuario autenticado
    const { titulo, contenido, autor, abstract} = req.body;
    const imagen = req.files && req.files['imagen'] ? `/uploads/posts/${req.files['imagen'][0].filename}` : null;
    const pdf = req.files && req.files['pdf'] ? `/uploads/pdfs/${req.files['pdf'][0].filename}` : null;

    try {
        const post = await db.Post.create({ id_usuario, titulo, contenido, autor, abstract, imagen, pdf });
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
    const imagen = req.files && req.files['imagen'] ? `/uploads/posts/${req.files['imagen'][0].filename}` : undefined;
    const pdf = req.files && req.files['pdf'] ? `/uploads/pdfs/${req.files['pdf'][0].filename}` : undefined;

    try {
        const post = await db.Post.findOne({ where: { id, id_usuario } });

        if (!post) {
            return res.status(404).send({ message: "Publicación no encontrada o no autorizada" });
        }

        post.titulo = titulo || post.titulo;
        post.contenido = contenido || post.contenido;
        post.autor = autor || post.autor;
        post.abstract = abstract || post.abstract;
        if (imagen !== undefined) post.imagen = imagen;
        if (pdf !== undefined) post.pdf = pdf;

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
        // Si el usuario autenticado solicita sus propios posts, permíteselo
        if (id_usuario === parseInt(id)) {
            const ownPosts = await db.Post.findAll({ where: { id_usuario } });
            return res.status(200).send(ownPosts);
        }
        // Verificar si sigo al usuario
        const isFollowed = await db.Following.findOne({
            where: { id_usuario, id_usuario_seguido: id },
        });

        if (!isFollowed) {
            return res.status(403).send({ message: "No tienes permiso para ver estas publicaciones" });
        }
        // Obtener las publicaciones del usuario objetivo
        const posts = await db.Post.findAll({
            where: { id_usuario: id },
        });
        if (posts.length === 0) {
            return res.status(200).send({ message: "El usuario no tiene publicaciones" });
        }
        res.status(200).send(posts);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};


module.exports ={
    createPost,
    listPosts,
    updatePost,
    deletePost,
    getPost,
    getUserPosts

}