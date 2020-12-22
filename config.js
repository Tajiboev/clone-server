const dotenv = require('dotenv');
dotenv.config()

module.exports = {
    pwd: process.env.MONGO_PASSWORD,
    dbname: process.env.MONGO_DBNAME,
    jwt_key: process.env.JWT_KEY
}