const express = require('express')
const router = express.Router()

const { getCustomer, createCustomer, updateCustomer, deleteCustomer } = require('../controllers/customerController')
const { getProducts, createProducts, updateProducts, deleteProducts } = require('../controllers/productController')

router.get('/getCustomer', customerMiddleware, (req, res) => {
    res.send('Middleware called')
}, getCustomer)
router.post('/createCustomer', createCustomer)
router.put('/updateCustomer', updateCustomer)
router.delete('/deleteCustomer', deleteCustomer)

function customerMiddleware(req, res, next) {
    const uniqueKey = req.header('wohlig.req.Id')
    console.log(uniqueKey);
    next()
}

router.get('/getProducts', getProducts)
router.post('/createProducts', createProducts)
router.put('/updateProducts', updateProducts)
router.delete('/deleteProducts', deleteProducts)

module.exports = router
