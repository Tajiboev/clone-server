const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')

const mongoose = require('mongoose')
const { pwd, dbname } = require('./config')

const productRoutes = require('./api/routes/products')
const userRoutes = require('./api/routes/users')

const chalk = require('chalk');
const log = console.log;

const app = express()
const corsOptions = {
  origin: 'http://localhost:3000',
}

mongoose.connect(`mongodb+srv://Mukhammadjon:${pwd}@restart.9oliw.mongodb.net/${dbname}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(()=>{
        log(chalk.green.bold('Successfully connected to DB'))
    })
    .catch(error => {
        log(chalk.red.bold('Failed to connect to DB', error))
    });


app.use(helmet())    
app.use(cors(corsOptions))
app.use(compression())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))


app.use('/api/products', productRoutes)
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


