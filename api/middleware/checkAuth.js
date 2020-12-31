const jwt = require('jsonwebtoken')
const { jwt_key } = require('../../config')
const ErrorWithStatusCode = require('../helpers/ErrorWithStatusCode');

module.exports = (req, res, next)=>{
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, jwt_key)
        req.isAuthenticated = true
        req.userData = decoded
        next()
    } catch (e) {
        next( new ErrorWithStatusCode('Authorization failed', 401))
    }
}