const express = require('express')
const router = express.Router()
const UsersController =  require('../controllers/users')
const {createUser, login, getUserById, deleteUser} = UsersController

const checkAuth = require('../middleware/checkAuth')
const {validateEmail, validatePassword} = require('../middleware/validateCredentials')

const {methodError} = require('../helpers/methodError')

router
.route('/signup')
.post(validateEmail, validatePassword, createUser)
.all(methodError({allowed: ['POST']}))




router.all('/signup', validateEmail, validatePassword, createUser)
router.post('/login', validateEmail, validatePassword, login)


router.get('/:userId',checkAuth, getUserById)
router.delete('/:userId', checkAuth, deleteUser)

module.exports = router