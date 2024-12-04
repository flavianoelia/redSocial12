const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const auth = require("../middlewares/authmiddleware");


/**
 * @swagger
 * /posts/create:
 *   post:
 *     tags: [Posts]
 *     summary: Crear una nueva publicación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: Título de la publicación
 *               contenido:
 *                 type: string
 *                 description: Contenido de la publicación
 *     responses:
 *       201:
 *         description: Publicación creada exitosamente
 *       500:
 *         description: Error interno del servidor
 */

router.post("/create", auth, postController.createPost);

/**
 * @swagger
 * /posts/list:
 *   get:
 *     tags: [Posts]
 *     summary: Listar todas las publicaciones
 *     responses:
 *       200:
 *         description: Lista de publicaciones obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID de la publicación
 *                   titulo:
 *                     type: string
 *                     description: Título de la publicación
 *                   contenido:
 *                     type: string
 *                     description: Contenido de la publicación
 *                   id_usuario:
 *                     type: integer
 *                     description: ID del usuario propietario
 *       500:
 *         description: Error interno del servidor
 */

router.get("/list", auth, postController.listPosts);


/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     tags: [Posts]
 *     summary: Modificar una publicación existente
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           description: ID de la publicación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: Nuevo título de la publicación
 *               contenido:
 *                 type: string
 *                 description: Nuevo contenido de la publicación
 *     responses:
 *       200:
 *         description: Publicación modificada exitosamente
 *       404:
 *         description: Publicación no encontrada o no autorizada
 *       500:
 *         description: Error interno del servidor
 */

router.put("/:id", auth, postController.updatePost);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     tags: [Posts]
 *     summary: Eliminar una publicación existente
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           description: ID de la publicación
 *     responses:
 *       200:
 *         description: Publicación eliminada exitosamente
 *       404:
 *         description: Publicación no encontrada o no autorizada
 *       500:
 *         description: Error interno del servidor
 */

router.delete("/:id", auth, postController.deletePost);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     tags: [Posts]
 *     summary: Ver una publicación específica
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           description: ID de la publicación
 *     responses:
 *       200:
 *         description: Publicación obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID de la publicación
 *                 titulo:
 *                   type: string
 *                   description: Título de la publicación
 *                 contenido:
 *                   type: string
 *                   description: Contenido de la publicación
 *                 id_usuario:
 *                   type: integer
 *                   description: ID del usuario propietario
 *       404:
 *         description: Publicación no encontrada
 *       403:
 *         description: No tienes permiso para ver esta publicación
 *       500:
 *         description: Error interno del servidor
 */

router.get("/:id", auth, postController.getPost);

/**
 * @swagger
 * /posts/user-posts/{id}:
 *   get:
 *     tags: [Posts]
 *     summary: Ver las publicaciones de un usuario determinado
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de publicaciones obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID de la publicación
 *                   titulo:
 *                     type: string
 *                     description: Título de la publicación
 *                   contenido:
 *                     type: string
 *                     description: Contenido de la publicación
 *                   id_usuario:
 *                     type: integer
 *                     description: ID del usuario propietario
 *       403:
 *         description: No tienes permiso para ver estas publicaciones
 *       500:
 *         description: Error interno del servidor
 */

router.get("/user-posts/:id", auth, postController.getUserPosts);

module.exports = router;
