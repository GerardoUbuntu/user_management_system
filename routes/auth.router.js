const express = require('express');
const router = express.Router();
const controller = require('../controller/auth.controller');
const auth = require('./middleware/auth');

router.post('/signUp', controller.signUp);

/**
 * @swagger
 * /api/v1/auth/signIn:
 *  post:
 *   tags:
 *     - User Management API
 *   description: Login user
 *   parameters:
 *     - in: body
 *       name: body
 *       description: user credentials email and password
 *       required: true
 *       schema:
 *         type: object
 *         properties:
 *           email:
 *             type: string
 *           password:
 *             type: string
 *         example:
 *           email: "johndoe@gmail.com"
 *           password: "Password@2022"
 *   security:
 *     - Bearer: []
 *   responses:
 *     200:
 *       description: 1.) return { result }
 *       examples:
 *         application/json: { "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY2NTg3ODY2LCJleHAiOjE2NjY1OTE0NjZ9.U7b6cmq6hm9VoZkW5uahwS0r1GJPWiGA3QN9z-su93M",
 *            "user": {
 *                "id": 1,
 *                "firstName": "John",
 *                "lastName": "Doe",
 *                "username": "admin",
 *                "email": "johndoe@gmail.com"
 *            }
 *          }
 *
 *     503:
 *       description: 2.) return { error_message }
 *       examples:
 *         application/json: { "error_message": "Cannot connect to database / System error." }
 * schemes:
 *   - http
 *   - https
 * securityDefinitions:
 *   Bearer:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 *
 */
router.post('/signIn', controller.signIn);

module.exports = router;
