const mongoose = require('mongoose')
const User = require('../models/user')
const ErrorWithStatusCode = require('../helpers/ErrorWithStatusCode');

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { jwt_key } = require('../../config')

//post => users/signup
module.exports.createUser = async function(req, res, next) {
    const user = await User.findOne({email: req.body.email}).exec()
    
    if (user) return next(new ErrorWithStatusCode("User already exists", 409))
    
    else {
        bcrypt.hash(req.body.password, 10, (err, hash)=>{
            if(err) return next(new ErrorWithStatusCode("Failed to hash password", 500))
            
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
    if (!user) return next(new ErrorWithStatusCode("Authorization failed", 401))

    bcrypt.compare(req.body.password, user.password, (err, same)=>{
        //same [true/false], err => bcrypt error = 500
        if (err) return next(new ErrorWithStatusCode('Authorization failed', 500))
        
        if (same) { 
            res.status(200).json({
                message: "Authorization successful", 
                token: jwt.sign({_id: user._id, email: user.email}, jwt_key, {expiresIn: '1h'})
            })
        } else {
            return next(new ErrorWithStatusCode("Authorization failed", 401))
        }
    })
}


module.exports.getUserById = async function (req, res, next) {
    if (req.userData._id === req.params.userId) return next(new ErrorWithStatusCode("Action prohibited", 403))
    const id = req.params.userId;
    try {
        const user = await User.findById(id).select({password: 0, __v: 0}).exec()
        if (user) res.status(200).json(user) 
        else {
            return next(new ErrorWithStatusCode("Failed to retrieve user data", 404))
        }
    } catch (e) {
        return next(new ErrorWithStatusCode("Failed to retrieve user data", 400))
    }
}

module.exports.deleteUser = async function (req, res, next) {
    if (req.userData._id === req.params.userId) return next(new ErrorWithStatusCode("Action prohibited", 403))

    User.findOneAndDelete({_id: req.params.userId}, (error, doc) => {
        if(error) {
            return next(new ErrorWithStatusCode("Failed to delete user a ", 400)) 
        }

        if (doc) return res.status(200).json({message: "User deleted", result: {
            id: doc._id,
            email: doc.email,
            deleted: true,
            deletedAt: new Date(),
        }})
        else {
            return next(new ErrorWithStatusCode("Failed to delete user b", 400))
        }
    })
}