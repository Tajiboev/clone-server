const express = require('express')
const router = express.Router()
const UsersController =  require('../controllers/users')
const {createUser, login, getUserById, deleteUser, updateUser} = UsersController

const checkAuth = require('../middleware/checkAuth')
const {validateEmail, validatePassword} = require('../middleware/validateCredentials')

const {methodError} = require('../helpers/methodError')

router
    .route('/signup')
    .post(validateEmail, validatePassword, createUser)
    .all(methodError({allowed: ['POST']}))


router
    .route('/login')
    .post(validateEmail, validatePassword, login)
    .all(methodError({allowed: ['POST']}))


router
    .route('/')
    .get(checkAuth, getUserById)
    .delete(checkAuth, deleteUser)
    .all(methodError({allowed: ['GET', 'DELETE']}))

//TODO: add router.patch('/:userId', updateUser)

module.exports = router