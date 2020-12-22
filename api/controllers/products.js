const Product = require('../models/product')
const mongoose = require('mongoose')
const e = require('express')

module.exports.getAllProducts = (req, res, next) => {
    Product.find()
        .select({__v: 0})
        .exec()
        .then(docs => {
            res.status(200).json({
                success: true,
                count: docs.length,
                products: docs
            })
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                errorMessage: "Failed to retrieve products",
                error: err
            })
        })
}

module.exports.getProductById = (req, res, next) => {
    const id = req.params.productId
    Product.findById(id)
        .select({__v: 0})
        .exec()
        .then((doc)=>{
            if(doc){
                res.status(200).json({
                    success: true,
                    product: doc
                })
            } else {
                res.status(404).json({ 
                    success: false,
                    error: "Requested product not found",
                })
            }         
        }).catch(err=>{
            // trigger: invalid product id
            let msg = "Internal Server Error"
            if (err.kind === 'ObjectId'){
                msg = "Invalid product ID. ID must be of type ObjectId"
            }
            res.status(500).json({
                success: false,
                errorMessage: msg,
                error: err
            })
        })
}

module.exports.addNewProduct = (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        createdAt: new Date(),
        // createdBy: req.userData._id
    })

    product.save()
        .then(result => {
            res.status(201).json({
            message: "Product has been added",
            product: result
            })
        }).catch(e => {
            res.status(500).json({
                success: false,
                errorMessage: "Failed to add new product",
                errors: e.errors
            })
        })
}


module.exports.removeProduct = (req, res, next) => {
    const id = req.params.productId
    Product.remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                success: true,
                message: "Product has been removed",
            })
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                error: {
                    message: "Failed to remove product",
                }
            })
        })
}

module.exports.updateProduct = (req, res, next)=>{
    const id = req.params.productId
    const patch = req.body
    Product.updateOne({_id: id}, patch)
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Product has been updated",
                result: result
            })
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                error: {
                    message: "Failed to update product",
                }
            })
        })
}