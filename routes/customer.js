const express = require('express')
const router = express.Router()

const { getCustomer, createCustomer, updateCustomer, deleteCustomer } = require('../controllers/customerController')
const { getProducts, createProducts, updateProducts, deleteProducts } = require('../controllers/productController')

router.get('/getCustomer', getCustomer)
router.post('/createCustomer', createCustomer)
router.put('/updateCustomer', updateCustomer)
router.delete('/deleteCustomer', deleteCustomer)

router.get('/getProducts', getProducts)
router.post('/createProducts', createProducts)
router.put('/updateProducts', updateProducts)
router.delete('/deleteProducts', deleteProducts)

module.exports = router
