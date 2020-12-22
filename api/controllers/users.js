const mongoose = require('mongoose')
const User = require('../models/user')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { jwt_key } = require('../../config')

const validateEmail = require('../helpers/validateEmail')
const validatePassword = require('../helpers/validatePassword')

module.exports.create_user = (req, res, next)=>{

    const isValidEmail = validateEmail(req.body.email)
    const isValidPassword = validatePassword(req.body.password)
    if(!isValidEmail) {
        return res.status(400).json({
            success: false,
            error: {
                message: 'Please provide a valid email',
            }
        })
    }
    if (!isValidPassword) {
        return res.status(400).json({
            success: false,
            error: {
                message: 'Please provide a valid password',
            }
        })
    }

    User.findOne({email: req.body.email})
        .exec()
        .then((user)=>{ 
            if (user){
                return res.status(409).json({
                    success: false,
                    error: {
                        message: "User already exists",
                    }
                })
            } 
            else {
                bcrypt.hash(req.body.password, 10, (err, hash)=>{
                    if (err) {
                        return res.status(500).json({
                            success: false,
                            error: {
                                message: "Failed to create user",
                            }
                        });
                    } 
                    else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash,
                        });
                        user.save()
                        .then((result)=>{
                            res.status(201).json({
                                success: true,
                                message: "User created",
                                created: {
                                    user: {                                          
                                        _id: result._id,
                                        email: result.email
                                    }
                                }
                            });
                        })
                        .catch(err=>{
                            res.status(500).json({
                                success: false,
                                error: {
                                    message: "Failed to create user",
                                }
                            });
                        })
                    }
                })
            }
        })
}


module.exports.delete_user = (req, res, next) => {
    User.deleteOne({_id: req.params.userId})
        .exec()
        .then(result=>{
            res.status(200).json({
                success: true,
                message: "User removed",
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                error: {
                    message: "Failed to delete user",
                }
            });
        })
}

module.exports.login = (req, res, next) => {
    User.findOne({email: req.body.email})
        .exec()
        .then((user)=>{
            if(user){
                bcrypt.compare(req.body.password, user.password, (err, result)=>{
                    if (err) {
                        return res.status(401).json({
                            success: false,
                            error: {
                                message: "Authorization failed"
                            }
                        })
                    }
                    if (result){
                        const token = jwt.sign(
                            {
                                _id: user._id, 
                                email: user.email, 
                                role: user.role,            
                            }, 
                            jwt_key, 
                            {
                                expiresIn: '1h'
                            })
                        return res.status(200).json({
                            success: true,
                            message: "Authorization successful", 
                            token: token
                        })
                    }
                    res.status(401).json({
                        success: false,
                        error: {
                            message: "Authorization failed"
                        }
                    })
                })
            } else {
                return res.status(401).json({
                    success: false,
                    error: {
                        message: "Authorization failed"
                    }
                })
            }
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                error: {
                    message: "Failed during authorization",
                }
            });
        })
}