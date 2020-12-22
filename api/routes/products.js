const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/checkAuth')
const checkUser = require('../middleware/checkUser')

const ProductController =  require('../controllers/products')
const {addNewProduct, getAllProducts, getProductById, updateProduct, removeProduct} = ProductController


router.get('/', getAllProducts)
router.get('/:productId', getProductById)


// POST (private)
router.post('/', addNewProduct)
router.patch('/:productId', updateProduct)
router.delete('/:productId', removeProduct)


module.exports = router