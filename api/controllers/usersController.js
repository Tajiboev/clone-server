const mongoose = require('mongoose')
const User = require('../models/user')
const ErrorWithStatusCode = require('../helpers/ErrorWithStatusCode');

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { jwt_key } = require('../../config')

//post => users/signup
module.exports.createUser = async function(req, res, next) {
    const {email, password, username} = req.body
 
    bcrypt.hash(password, 10, (err, hash)=>{
        if(err) return next(new ErrorWithStatusCode("Failed to hash password", 500))
        
        else {
            User.create({
                _id: new mongoose.Types.ObjectId(),
                private: {
                    email: email,
                    password: hash,
                    emailStatus: "in-use"
                },
                username: username,
                createdAt: new Date(),
            }, (err, result)=>{
                if (err) return next(new ErrorWithStatusCode("Failed to create user", 400))
                res.status(201).json({message: 'User created', user: result })
            })
            
            // newUser.save()
            //     .then(result =>{
                    
            //     })
            //     .catch(e =>{
            //         res.status(400).json({message: 'Failed to create user', error: e})
            //     })
        }
    })
                     
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


module.exports.getUser = async function (req, res, next) {
    const {username} = req.query
    console.log("username:", username)
    try {
        console.log('try:', username)
        const user = await User.findOne({username: username}).select({password: 0, __v: 0}).exec()
        if (user) res.status(200).json(user) 
        else {
            return next(new ErrorWithStatusCode("Failed to retrieve user data", 404))
        }
    } catch (e) {
        return next(new ErrorWithStatusCode("Failed to retrieve user data", 400))
    }
}

module.exports.deleteUser = async function (req, res, next) {
    if (req.userData._id !== req.query.id) return next(new ErrorWithStatusCode("Action prohibited", 403))

    User.findOneAndDelete({_id: req.query.id}, (error, doc) => {
        if(error) {
            return next(new ErrorWithStatusCode("Failed to delete user", 400)) 
        }

        if (doc) return res.status(200).json({message: "User deleted", result: {
            id: doc._id,
            email: doc.email,
            deleted: true,
            deletedAt: new Date(),
        }})
        else {
            return next(new ErrorWithStatusCode("Failed to delete user", 400))
        }
    })
}

// TODO: add updateUser