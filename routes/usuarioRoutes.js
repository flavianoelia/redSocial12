const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const auth = require("../middlewares/authmiddleware");
const upload = require("../middlewares/uploadMiddleware");

/**
 * @swagger
 * /usuarios/register:
 *   post:
 *     tags: [Usuarios]
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               mail:
 *                 type: string
 *                 format: email
 *               nickname:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nombre:
 *                   type: string
 *                 mail:
 *                   type: string
 *                 nickname:
 *                   type: string
 *       400:
 *         description: Bad request - missing or invalid fields
 *       500:
 *         description: Internal server error
 */
router.post("/register", usuarioController.register);

/**
 * @swagger
 * /usuarios/me:
 *   put:
 *     tags: [Usuarios]
 *     summary: Update current user's profile
 *     security:
 *       - ApiTokenAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               nickname:
 *                 type: string
 *               mail:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Bad request - validation error
 *       404:
 *         description: User not found
 */
router.put("/me", auth, upload.single('avatar'), usuarioController.update);

/**
 * @swagger
 * /usuarios/me:
 *   get:
 *     tags: [Usuarios]
 *     summary: Get current user's profile
 *     security:
 *       - ApiTokenAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID of the user
 *                 nombre:
 *                   type: string
 *                   description: User name
 *                 nickname:
 *                   type: string
 *                   description: User nickname
 *                 mail:
 *                   type: string
 *                   format: email
 *                   description: User email
 *                 avatar:
 *                   type: string
 *                   description: User avatar URL
 *                 publicaciones:
 *                   type: integer
 *                   description: Number of user posts
 *                 contactos:
 *                   type: integer
 *                   description: Number of user contacts
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get("/me", auth, usuarioController.getMe);

/**
 * @swagger
 * /usuarios/list:
 *   get:
 *     tags: [Usuarios]
 *     summary: List all users with pagination
 *     parameters:
 *       - name: page
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Page number for pagination
 *       - name: limit
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Number of users per page
 *     responses:
 *       200:
 *         description: A paginated list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalItems:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 *                 itemsPerPage:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       nombre:
 *                         type: string
 *                       nickname:
 *                         type: string
 *                       mail:
 *                         type: string
 *                         format: email
 *       400:
 *         description: Bad request - page or limit must be positive
 *       500:
 *         description: Internal server error
 */
router.get("/list", usuarioController.list);

/**
 * @swagger
 * /usuarios/login:
 *   post:
 *     tags: [Usuarios]
 *     summary: login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               mail:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: token create successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nombre:
 *                   type: string
 *                 mail:
 *                   type: string
 *       404:
 *          description:  user not found
 *       400:
 *         description: Bad request - password incorrecto
 *       500:
 *         description: Internal server error
*/
router.post("/login", usuarioController.login);

/**
 * @swagger
 * /usuarios/search:
 *   get:
 *     tags: [Usuarios]
 *     summary: Search users by name or nickname
 *     parameters:
 *       - name: q
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Search term to match against name or nickname
 *     responses:
 *       200:
 *         description: A list of matching users
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
 *                   mail:
 *                     type: string
 *                     format: email
 *                   avatar:
 *                     type: string
 *       400:
 *         description: Bad request - missing search parameter
 *       500:
 *         description: Internal server error
 */
router.get("/search", usuarioController.search);


module.exports = router;