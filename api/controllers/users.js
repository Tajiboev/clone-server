const mongoose = require('mongoose')
const User = require('../models/user')
const ErrorWithStatusCode = require('../helpers/ErrorWithStatusCode');

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { jwt_key } = require('../../config')

//post => users/signup
module.exports.createUser = async function(req, res, next) {
    const user = await User.findOne({email: req.body.email}).exec()
    
    if (user) next(new ErrorWithStatusCode("User already exists", 409))
    
    else {
        bcrypt.hash(req.body.password, 10, (err, hash)=>{
            if(err) next(new ErrorWithStatusCode("Failed to hash password", 500))
            
            else {
                const newUser = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash,
                        createdAt: new Date(),
                    })
                newUser.save()
                    .then(result =>{
                        res.status(201).json({message: 'User created', user: {
                            id: result._id,
                            email: result.email,
                            createdAt: result.createdAt,
                        } })
                    })
                    .catch(e =>{
                        res.status(400).json({message: 'Failed to create user', error: e})
                    })
            }
        })
    }                 
}

module.exports.login = async function (req, res, next) {
    const user = await User.findOne({email: req.body.email}).exec()
    if (!user) next(new ErrorWithStatusCode("Authorization failed", 401))

    bcrypt.compare(req.body.password, user.password, (err, same)=>{
        //same [true/false], err => bcrypt error = 500
        if (err) {
            next(new ErrorWithStatusCode('Authorization failed', 500))
        }
        
        if (same) { 
            res.status(200).json({
                message: "Authorization successful", 
                token: jwt.sign({_id: user._id, email: user.email}, jwt_key, {expiresIn: '1h'})
            })
        } else {
            next(new ErrorWithStatusCode("Authorization failed", 401))
        }
    })
}

module.exports.deleteUser = async function (req, res, next) {
    if (req.userData.email === req.body.email) next(new ErrorWithStatusCode("Action prohibited", 403))

    const deleted = await User.deleteOne({_id: req.params.userId}).exec()
    if (deleted) res.status(200).json({message: "User deleted"})    
    
    next(new ErrorWithStatusCode("Failed to delete user", 500))
}