const express = require('express')
const router = express.Router()

const { getCustomer, createCustomer, updateCustomer, deleteCustomer } = require('../controllers/customerController')
const { getProducts, createProducts, updateProducts, deleteProducts } = require('../controllers/productController')

router.get('/getCustomer', customerMiddleware, (req,res)=>{
    const uniqueId = (req.name) ? `${req.name}`: ' ';
    res.send(`Get the customer, ${uniqueId}`)
})
router.post('/createCustomer', createCustomer)
router.put('/updateCustomer', updateCustomer)
router.delete('/deleteCustomer', deleteCustomer)

function customerMiddleware(req, res, next) {
    req.name = req.header('wohlig.req.ID')
}

router.get('/getProducts', getProducts)
router.post('/createProducts', createProducts)
router.put('/updateProducts', updateProducts)
router.delete('/deleteProducts', deleteProducts)      

module.exports = router
