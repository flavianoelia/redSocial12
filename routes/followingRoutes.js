const express = require("express");
const router = express.Router();
const followingController = require("../controllers/followingController");
const auth = require("../middlewares/authmiddleware");


/**
 * @swagger
 * /usuarios/follow:
 *   post:
 *     tags: [Usuarios]
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
router.post("/", auth, followingController.follow);

/**
 * @swagger
 * /usuarios/following:
 *   get:
 *     tags: [Usuarios]
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
router.get("/getfollowing", auth, followingController.getfollowing)


router.delete("/unfollow", auth, followingController.unfollow)
module.exports = router;