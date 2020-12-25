const jwt = require('jsonwebtoken')
const { jwt_key } = require('../../config')



module.exports = (req, res, next)=>{
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, jwt_key)
        req.userData = decoded
        next()
    } catch (e) {
        return res.status(401).json({errorMessage: "Authorization failed"})
    }
}