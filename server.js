const http = require('http')
const app = require('./app')
const chalk = require('chalk')
const log = console.log
const port = process.env.PORT || 3001

const server = http.createServer(app)

server.listen(port, ()=>{log(chalk.greenBright(`\nServer listening on port ${port}`))})

