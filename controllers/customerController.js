const mongoose = require("mongoose");
const {Customer} = require('./export')
const Ajv = require('ajv')

mongoose.connect("mongodb://localhost:27017/ClothSite").then(()=>{
    console.log("Clothing Site...");
}).catch((err)=>{
    console.log(err);
})

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

    const validate= ajv.addSchema(customerSchema).compile(customerSchema)
    const valid =  validate(req.body)
    if(!valid){
        console.log(validate.errors);
    }

    const data = req.body
    console.log(data);
    const result = await Customer.insertMany(data)
    console.log(result);
}

module.exports = {getCustomer,createCustomer}