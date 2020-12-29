const express = require('express')
const router = express.Router()
const UsersController =  require('../controllers/usersController')
const {createUser, login, getUser, deleteUser, updateUser} = UsersController

const checkAuth = require('../middleware/checkAuth')
const checkUser = require('../middleware/checkUser')
const {validateEmail, validatePassword} = require('../middleware/validateCredentials')

const {methodError} = require('../helpers/methodError')

router
    .route('/signup')
    .post(validateEmail, validatePassword, checkUser, createUser)
    .all(methodError({allowed: ['POST']}))


router
    .route('/login')
    .post(validateEmail, validatePassword, login)
    .all(methodError({allowed: ['POST']}))


router
    .route('/')
    .get(checkAuth, getUser)
    .delete(checkAuth, deleteUser)
    .all(methodError({allowed: ['GET', 'DELETE']}))

//TODO: add router.patch('/:userId', updateUser)

module.exports = router