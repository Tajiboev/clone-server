const express = require('express')
const router = express.Router()
const UsersController =  require('../controllers/users')
const {createUser, login, deleteUser} = UsersController

const checkAuth = require('../middleware/checkAuth')
const {validateEmail, validatePassword} = require('../middleware/validateCredentials')


router.post('/signup', validateEmail, validatePassword, createUser)
router.post('/login', validateEmail, validatePassword, login)

router.delete('/:userId', checkAuth, deleteUser)

module.exports = router