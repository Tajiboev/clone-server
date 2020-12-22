const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const chalk = require('chalk');
const log = console.log;

const { pwd, dbname } = require('./config')

const app = express()

const productRoutes = require('./api/routes/products')
// const userRoutes = require('./api/routes/users')

mongoose.set('useCreateIndex', true)
mongoose.connect(`mongodb+srv://Mukhammadjon:${pwd}@restart.9oliw.mongodb.net/${dbname}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>{
        log(chalk.green.bold('Successfully connected to DB'))
    })
    .catch(error => {
        log(chalk.red.bold('Failed to connect to DB'))
    });

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Handling CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");    
    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE");
        return res.status(200).json({})
    }
    next();
})

app.use('/products', productRoutes)
// app.use('/users', userRoutes)


// Error handler
app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
            sussess: false,
            error: {
                message: error.message
            }
    })
})

module.exports = app


