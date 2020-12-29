const express = require('express')
const router = express.Router()
const ProjectController =  require('../controllers/projectsController')
const {getProject,}

const checkAuth = require('../middleware/checkAuth')
const {methodError} = require('../helpers/methodError')

router
    .route('/')
    .get(getProject)
    .post(checkAuth, createProject)
    .delete(checkAuth, deleteProject)
    .patch(checkAuth, updateProject)
    .all(methodError({allowed: ['POST', 'GET', 'PATCH', 'DELETE']}))




module.exports = router