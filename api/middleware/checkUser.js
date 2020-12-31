const ErrorWithStatusCode = require('../helpers/ErrorWithStatusCode');
const User = require('../models/user')

module.exports = async (req, res, next)=>{
    const {email, username} = req.body
    if (email && username) {
        try {
            console.log(email)
            const emailTaken = await User.exists({ email: email })
            console.log(emailTaken)
            if (emailTaken) return next(new ErrorWithStatusCode('User with this email already exists', 409))
            
            const usernameTaken = await User.exists({ username: username })
            if (usernameTaken) return next(new ErrorWithStatusCode('This username is already taken', 409))

            next()
        } catch (e) {
            next( new ErrorWithStatusCode('Failed to check whether user exists', 401))
        }
    }
    else {
        return next(new ErrorWithStatusCode("Please provide valid email and username", 401))
    }  
}
