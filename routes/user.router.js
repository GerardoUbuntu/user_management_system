const express = require('express');
const router = express.Router();
const controller = require('../controller/user.controller');
const auth = require('./middleware/auth');

/**
 * @swagger
 * /api/v1/users/:
 *  get:
 *   tags:
 *     - User Management API
 *   description: Get all users
 *   security:
 *     - Bearer: []
 *   responses:
 *     200:
 *       description: 1.) return { result }
 *       examples:
 *         application/json: { "data": [{"id": 1,"username": "admin",
 *      "email": "johndoe@gmail.com",
 *      "firstName": "John",
 *      "lastName": "Doe",
 *      "address": "Sta. Mesa, Manila",
 *      "contact": "09989208414",
 *      "postcode": "1003",
 *      "createdAt": "2022-10-23T15:24:48.000Z",
 *      "updatedAt": "2022-10-23T15:24:48.000Z"
 *   }]
 *                          }
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
router.get('/', auth, controller.getUsers);

/**
 * @swagger
 * /api/v1/users/:
 *  post:
 *   tags:
 *     - User Management API
 *   description: Add a new user
 *   parameters:
 *     - in: body
 *       name: body
 *       description: User Details
 *       required: true
 *       schema:
 *         $ref: "#/definitions/user"
 *   security:
 *     - Bearer: []
 *   responses:
 *     200:
 *       description: 1.) return { result }
 *       examples:
 *         application/json: { "data": {"id": 1,"username": "admin1",
 *      "email": "johndoe1@gmail.com",
 *      "firstName": "John1",
 *      "lastName": "Doe1",
 *      "address": "Sta. Mesa, Manila",
 *      "contact": "09989208414",
 *      "postcode": "1003",
 *      "createdAt": "2022-10-23T15:24:48.000Z",
 *      "updatedAt": "2022-10-23T15:24:48.000Z"
 *   }
 *                          }
 *     503:
 *       description: 2.) return { error_message }
 *       examples:
 *         application/json: { "error_message": "Cannot connect to database / System error." }
 * definitions:
 *   user:
 *    type: object
 *    properties:
 *      username:
 *        type: string
 *      firstName:
 *        type: string
 *      lastName:
 *        type: string
 *      email:
 *        type: string
 *      address:
 *        type: string
 *      contact:
 *        type: string
 *      postcode:
 *        type: string
 *    example:
 *      username: "admin"
 *      email: "johndoe@gmail.com"
 *      firstName: "John"
 *      lastName: "Doe"
 *      address: "Sta. Mesa, Manila"
 *      contact: "09989208414"
 *      postcode: "1003"
 *
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
router.post('/', auth, controller.addUser);

/**
 * @swagger
 * /api/v1/users/{id}:
 *  get:
 *   tags:
 *     - User Management API
 *   description: Get user by id
 *   parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: integer
 *       required: true
 *   security:
 *     - Bearer: []
 *   responses:
 *     200:
 *       description: 1.) return { result }
 *       examples:
 *         application/json: { "data": {"id": 1,"username": "admin",
 *      "email": "johndoe@gmail.com",
 *      "firstName": "John",
 *      "lastName": "Doe",
 *      "address": "Sta. Mesa, Manila",
 *      "contact": "09989208414",
 *      "postcode": "1003",
 *      "createdAt": "2022-10-23T15:24:48.000Z",
 *      "updatedAt": "2022-10-23T15:24:48.000Z"
 *   }
 *                          }
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
router.get('/:id', auth, controller.getUser);

/**
 * @swagger
 * /api/v1/users/{id}:
 *  put:
 *   tags:
 *     - User Management API
 *   description: Edit user by id
 *   parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: integer
 *       required: true
 *     - in: body
 *       name: body
 *       description: User Details
 *       required: true
 *       schema:
 *         $ref: "#/definitions/user"
 *   security:
 *     - Bearer: []
 *   responses:
 *     200:
 *       description: 1.) return { result }
 *       examples:
 *         application/json: {  "message": "Successfully updated user with id 51 " }
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
router.put('/:id', auth, controller.editUser);

/**
 * @swagger
 * /api/v1/users/{id}:
 *  delete:
 *   tags:
 *     - User Management API
 *   description: Delete user by id
 *   parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: integer
 *       required: true
 *   security:
 *     - Bearer: []
 *   responses:
 *     200:
 *       description: 1.) return { result }
 *       examples:
 *         application/json: { "message": "Successfully deleted user with id 51 " }
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
router.delete('/:id', auth, controller.deleteUser);

module.exports = router;
