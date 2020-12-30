const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression') 



// const projectRoutes = require('./api/routes/projects')
const userRoutes = require('./api/routes/users')


const app = express()

// connect to mongodb with mongoose 
require('./connectDB')

app.use(helmet())    
app.use(cors())
app.use(compression())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))


// app.use('/api/projects', projectRoutes)
app.use('/api/users', userRoutes)


// Error handler
app.use((req, res, next) => {
    const error = new Error('Not found')
    error.statusCode = 404
    next(error)
})

app.use((error, req, res, next) => {
    // may log error here
    res.status(error.statusCode || 500).json({ errorMessage: error.message });
});

module.exports = app


