const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const mongoose = require('mongoose')
const { pwd, dbname } = require('./config')

const productRoutes = require('./api/routes/products')
const userRoutes = require('./api/routes/users')

const chalk = require('chalk');
const log = console.log;

const app = express()

mongoose.connect(`mongodb+srv://Mukhammadjon:${pwd}@restart.9oliw.mongodb.net/${dbname}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(()=>{
        log(chalk.green.bold('Successfully connected to DB'))
    })
    .catch(error => {
        log(chalk.red.bold('Failed to connect to DB', error))
    });

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Handling CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");    
    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
        return res.status(200).json({})
    }
    next();
})

app.use('/products', productRoutes)
app.use('/users', userRoutes)


// Error handler
app.use((req, res, next) => {
    const error = new Error('Not found')
    error.statusCode = 404
    next(error)
})

app.use((error, req, res, next) => {
    // may log error here
    res.status(error.statusCode || 500).json({ errorMessage: error.message, handler: "app" });
});

module.exports = app


