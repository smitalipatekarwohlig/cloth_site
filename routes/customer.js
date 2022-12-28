const express = require('express')
const router = express.Router()


const {getCustomer,createCustomer,updateCustomer,deleteCustomer}= require('../controllers/customerController')
const {getProducts,createProducts,updateProducts}= require('../controllers/productController')

router.route('/getCustomer').get(getCustomer)
router.route('/createCustomer').post(createCustomer)
router.route('/updateCustomer').put(updateCustomer)
router.route('/deleteCustomer').delete(deleteCustomer)

router.route('/getProducts').get(getProducts)
router.route('/createProducts').post(createProducts)
router.route('./updateProducts').put(updateProducts)

module.exports= router