const mongoose = require('mongoose')
const { pwd, dbname } = require('./config')
const chalk = require('chalk');
const log = console.log;


module.exports = mongoose.connect(`mongodb+srv://Mukhammadjon:${pwd}@restart.9oliw.mongodb.net/${dbname}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(()=>{
        log(chalk.greenBright('Successfully connected to DB\n'))
    })
    .catch(error => {
        log(chalk.redBright('Failed to connect to DB\n', error))
    })
    
