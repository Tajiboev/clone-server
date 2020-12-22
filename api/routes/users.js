const express = require('express')
const router = express.Router()
const UsersController =  require('../controllers/users')

const checkAuth = require('../middleware/checkAuth')
const checkUser = require('../middleware/checkUser')


router.post('/signup', UsersController.create_user)
router.post('/login', UsersController.login)

router.delete('/:userId', checkAuth, checkUser, UsersController.delete_user)



module.exports = router