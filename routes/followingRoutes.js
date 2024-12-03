const express = require("express");
const router = express.Router();
const followingController = require("../controllers/followingController");
const auth = require("../middlewares/authmiddleware");


/**
 * @swagger
 * /followings/follow:
 *   post:
 *     tags: [Following]
 *     summary: Follow a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_usuario_seguido:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Has comenzado a seguir al usuario
 *       400:
 *         description: No puedes seguirte a ti mismo
 *       401:
 *         description: Ya sigues a este usuario
 *       500:
 *         description: Internal server error
 */
router.post("/follow", auth, followingController.follow);

/**
 * @swagger
 * /followings/following:
 *   get:
 *     tags: [Following]
 *     summary: Get the list of users the current user is following
 *     responses:
 *       200:
 *         description: A list of users the current user is following
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nombre:
 *                     type: string
 *                   nickname:
 *                     type: string
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Internal server error
 */
router.get("/following", auth, followingController.getFollowing)

/**
 * @swagger
 * /followings/unfollow:
 *   delete:
 *     tags: [Following]
 *     summary: Unfollow a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_usuario_seguido:
 *                 type: integer
 *                 description: ID del usuario al que se dejará de seguir
 *     responses:
 *       200:
 *         description: Relación de seguimiento eliminada con éxito
 *       404:
 *         description: Relación de seguimiento no encontrada
 *       500:
 *         description: Error interno del servidor
 */

router.delete("/unfollow", auth, followingController.unfollow);

/**
 * @swagger
 * /followings/followers:
 *   get:
 *     tags: [Following]
 *     summary: Get the list of users following the current user
 *     responses:
 *       200:
 *         description: Lista de seguidores obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID del usuario seguidor
 *                   nombre:
 *                     type: string
 *                     description: Nombre del usuario seguidor
 *                   nickname:
 *                     type: string
 *                     description: Nickname del usuario seguidor
 *       404:
 *         description: El usuario no tiene seguidores
 *       500:
 *         description: Error interno del servidor
 */

router.get("/followers", auth, followingController.getFollowers);

/**
 * @swagger
 * /followings/mutual:
 *   get:
 *     tags: [Following]
 *     summary: Get the list of users with mutual follow relationships
 *     responses:
 *       200:
 *         description: Lista de usuarios con seguimiento mutuo obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID del usuario con seguimiento mutuo
 *                   nombre:
 *                     type: string
 *                     description: Nombre del usuario con seguimiento mutuo
 *                   nickname:
 *                     type: string
 *                     description: Nickname del usuario con seguimiento mutuo
 *       404:
 *         description: No hay relaciones de seguimiento mutuo
 *       500:
 *         description: Error interno del servidor
 */

router.get("/mutual", auth, followingController.getMutuals);


module.exports = router;