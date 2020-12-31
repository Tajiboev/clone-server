const ErrorWithStatusCode = require('../helpers/ErrorWithStatusCode');
const User = require('../models/user')

module.exports = async (req, res, next)=>{
    const {email, username} = req.body

    if (!(email && username)) {
        return next( new ErrorWithStatusCode("Please provide a valid email and username", 400));
    }


    const emailExists = await User.exists({email: email});
    if (emailExists) return next( new ErrorWithStatusCode("Email already in use", 400))
    
    const usernameExists = await User.exists({username: username});
    if (usernameExists) return next( new ErrorWithStatusCode("Username already in use", 400))

    next()
}
