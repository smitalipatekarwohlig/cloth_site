const express = require('express')
const router = express.Router()


const {getCustomer,createCustomer}= require('../controllers/customerController')

router.route('./getCustomer').get('getCustomer')
router.route('./createCustomer').post('createCustomer')


module.exports= router