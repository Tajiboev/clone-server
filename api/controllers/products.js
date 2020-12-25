const Product = require('../models/product')
const mongoose = require('mongoose')
const ErrorWithStatusCode = require('../helpers/ErrorWithStatusCode');


module.exports.getAllProducts = async function(req, res, next) {
    try {
        const products = await Product.find().select({__v: 0}).exec()
        if (products) {
            res.status(200).json(products)
        } else {
            throw new ErrorWithStatusCode("Failed to retrieve products", 500)
        }
    } catch (e) {
        throw new ErrorWithStatusCode("WTF", 500)
    }
}

module.exports.getProductById = async function(req, res, next){
    const id = req.params.productId

    const product = await Product.findById(id).select({__v: 0}).exec()
    if (product) {
        res.status(200).json(product)
    } else {
        throw new ErrorWithStatusCode("Product not found", 404)
    }
}

module.exports.addNewProduct = (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        createdAt: new Date(),
        createdBy: req.userData._id
    })

    product.save()
        .then(result => {
            res.status(201).json({
            message: "Product has been added",
            product: result
            })
        }).catch(e => {
            res.status(500).json({
                errorMessage: "Failed to add new product",
                errors: e.errors
            })
        })
}


module.exports.removeProduct = (req, res, next) => {
    const id = req.params.productId
    Product.deleteOne({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({message: "Product has been removed"})
        })
        .catch(e => {
            res.status(500).json({errorMessage: "Failed to remove product"})
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
        .catch(() => {
            res.status(500).json({errorMessage: "Failed to update product"})
        })
}