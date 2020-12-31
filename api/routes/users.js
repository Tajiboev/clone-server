const express = require('express')
const router = express.Router()
const UsersController =  require('../controllers/usersController')
const {createUser, login, getUser, deleteUser, updateUser} = UsersController

const checkAuth = require('../middleware/checkAuth')
const checkExistingUser = require('../middleware/checkExistingUser')
const {validateEmail, validatePassword} = require('../middleware/validateCredentials')

const {methodError} = require('../helpers/methodError')

router
    .route('/signup')
    .post(validateEmail, validatePassword, checkExistingUser, createUser)
    .all(methodError({allowed: ['POST']}))


router
    .route('/login')
    .post(validateEmail, validatePassword, login)
    .all(methodError({allowed: ['POST']}))


router
    .route('/')
    .get(getUser) //by id or username [make sure you don't send private fields in response]
    .delete(checkAuth, deleteUser)
    .all(methodError({allowed: ['GET', 'DELETE']}))

//TODO: add router.patch('/:userId', updateUser)

module.exports = router