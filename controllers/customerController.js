const Customer = require('../models/customerSchema')
const Ajv = require('ajv')


const getCustomer= async(req,res)=>{
    try {
        const result= await Customer.find()
        console.log(result);
    } catch (err) {
        console.log(err);
    }
}

const createCustomer= async(req,res)=>{
    const customerSchema= {
        type: 'array',
        properties: {
            name : {
                type: String
            },
            gender: {
                type: String
            },
            mobileNo: {
                type: Number,
            },
            email: {
                type: String
            },
            address: {
                type: String
            }
        },
        required: ['name','gender','mobileNo','email','address'],
        additionalProperties: true
    }
    
    const ajv = new Ajv()
    try {
        const validate= ajv.addSchema(customerSchema).compile(customerSchema)
        const valid =  validate(req.body)
    if(!valid){
        console.log(validate.errors);
    }
    } catch (err) {
        console.log(err);
    }

    const data =req.body
    console.log(data,' ',"Customer",Customer);
    const result = await Customer.create(data)
    console.log("result----",result)
}

const updateCustomer= async(req,res)=>{
    try {
        const data = req.body
        console.log(data,' ',"Customer",Customer);
        const result = await Customer.findByIdAndUpdate({_id:data._id},data,{new : true,mobileNo: 54321})
        console.log("result--",result);
    } catch (err) {
        console.log(err);
    }
}

const deleteCustomer= async(req,res)=>{
    try {
        const data = req.body._id
        console.log(data,' ',"Customer",Customer)
        const result = await Customer.deleteOne({_id:data})
        console.log("result--",result);
    } catch (err) {
        console.log(err);
    }
}

module.exports = {getCustomer,createCustomer,updateCustomer,deleteCustomer}