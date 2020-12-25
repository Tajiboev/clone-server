const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/checkAuth')

const ProductController =  require('../controllers/products')
const {addNewProduct, getAllProducts, getProductById, updateProduct, removeProduct} = ProductController

router.get('/', getAllProducts)
router.get('/:productId', getProductById)


// private
router.post('/', checkAuth, addNewProduct)
router.patch('/:productId', checkAuth, updateProduct)
router.delete('/:productId', checkAuth, removeProduct)


module.exports = router