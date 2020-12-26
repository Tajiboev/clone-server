const ErrorWithStatusCode = require('../helpers/ErrorWithStatusCode');


module.exports.validateEmail = (req, res, next) => {
        const validEmail = req.body.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
        if (!validEmail) throw new ErrorWithStatusCode("Please provide a valid email address", 400)
        // const valid = new RegExp(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)
        // return valid.test(email)
        next()
}


module.exports.validatePassword = (req, res, next)=>{
        // Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:
        const validPassword = req.body.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
        if (!validPassword) throw new ErrorWithStatusCode("Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter and one number", 400)
        
        next()
}
