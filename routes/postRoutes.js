const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const auth = require("../middlewares/authmiddleware");
const upload = require("../middlewares/uploadMiddleware");


/**
* @swagger
 * /posts/create:
 *   post:
 *     tags: [Posts]
 *     summary: Create a new post (common or for article)
 *     security:
 *       - ApiTokenAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 description: Título de la publicación
 *               contenido:
 *                 type: string
 *                 description: Contenido de la publicación
 *               autor:
 *                 type: string
 *                 description: Autor del artículo (opcional para posts comunes)
 *               abstract:
 *                 type: string
 *                 description: Resumen del artículo (opcional para posts comunes)
 *               imagen:
 *                 type: string
 *                 format: binary
 *                 description: Imagen del post (opcional)
 *               pdf:
 *                 type: string
 *                 format: binary
 *                 description: PDF del artículo (opcional)
 *     responses:
 *       201:
 *         description: Publicación creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID de la publicación
 *                 id_usuario:
 *                   type: integer
 *                   description: ID del usuario propietario
 *                 titulo:
 *                   type: string
 *                   description: Título de la publicación
 *                 contenido:
 *                   type: string
 *                   description: Contenido de la publicación
 *                 autor:
 *                   type: string
 *                   description: Autor del artículo
 *                 abstract:
 *                   type: string
 *                   description: Resumen del artículo
 *                 imagen:
 *                   type: string
 *                   description: Ruta de la imagen
 *                 pdf:
 *                   type: string
 *                   description: Ruta del PDF
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       500:
 *         description: Error interno del servidor
 */
router.post("/create", auth, upload.fields([{ name: 'imagen', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]), postController.createPost);

/**
 * @swagger
 * /posts/list:
 *   get:
 *     tags: [Posts]
 *     summary: List all posts
 *     security:
 *       - ApiTokenAuth: []
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
 *                   id_usuario:
 *                     type: integer
 *                     description: ID del usuario propietario
 *                   titulo:
 *                     type: string
 *                     description: Título de la publicación
 *                   contenido:
 *                     type: string
 *                     description: Contenido de la publicación
 *                   autor:
 *                     type: string
 *                     description: Autor del artículo
 *                   abstract:
 *                     type: string
 *                     description: Resumen del artículo
 *                   imagen:
 *                     type: string
 *                     description: Ruta de la imagen
 *                   pdf:
 *                     type: string
 *                     description: Ruta del PDF
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                   Usuario:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       nombre:
 *                         type: string
 *                       nickname:
 *                         type: string
 *       500:
 *         description: Error interno del servidor
 */
router.get("/list", auth, postController.listPosts);


/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     tags: [Posts]
 *     summary: Update a post
 *     security:
 *       - ApiTokenAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the post to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               contenido:
 *                 type: string
 *               autor:
 *                 type: string
 *               abstract:
 *                 type: string
 *               imagen:
 *                 type: string
 *                 format: binary
 *               pdf:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Post updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 id_usuario:
 *                   type: integer
 *                 titulo:
 *                   type: string
 *                 contenido:
 *                   type: string
 *                 autor:
 *                   type: string
 *                 abstract:
 *                   type: string
 *                 imagen:
 *                   type: string
 *                 pdf:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Post not found or unauthorized
 *       500:
 *         description: Internal server error
 */
router.put('/:id', auth, upload.fields([{ name: 'imagen', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]), postController.updatePost);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     tags: [Posts]
 *     summary: Delete an existing post
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
 *     summary: View a specific post
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
 *                 id_usuario:
 *                   type: integer
 *                   description: ID del usuario propietario
 *                 titulo:
 *                   type: string
 *                   description: Título de la publicación
 *                 contenido:
 *                   type: string
 *                   description: Contenido de la publicación
 *                 autor:
 *                   type: string
 *                   description: Autor del artículo
 *                 abstract:
 *                   type: string
 *                   description: Resumen del artículo
 *                 imagen:
 *                   type: string
 *                   description: Ruta de la imagen
 *                 pdf:
 *                   type: string
 *                   description: Ruta del PDF
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                 Usuario:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     nombre:
 *                       type: string
 *                     nickname:
 *                       type: string
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
 *     summary: View posts from a given user
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
 *                   id_usuario:
 *                     type: integer
 *                     description: ID del usuario propietario
 *                   titulo:
 *                     type: string
 *                     description: Título de la publicación
 *                   contenido:
 *                     type: string
 *                     description: Contenido de la publicación
 *                   autor:
 *                     type: string
 *                     description: Autor del artículo
 *                   abstract:
 *                     type: string
 *                     description: Resumen del artículo
 *                   imagen:
 *                     type: string
 *                     description: Ruta de la imagen
 *                   pdf:
 *                     type: string
 *                     description: Ruta del PDF
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       403:
 *         description: No tienes permiso para ver estas publicaciones
 *       500:
 *         description: Error interno del servidor
 */
router.get("/user-posts/:id", auth, postController.getUserPosts);

module.exports = router;
