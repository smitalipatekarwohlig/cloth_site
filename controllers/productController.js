const Product= require('../models/productSchema')
const Ajv= require('ajv')

const getProducts= async(req,res)=>{
    try {
        const result= await Product.find()
        console.log(result);
    } catch (err) {
        console.log(err);
    }
}

const createProducts= async(req,res)=>{
    const productSchema= {
        type: 'array',
        properties: {
            category: {
                type: String
            },
            productName: {
                type: String
            },
            brand: { 
                type: String
            },
            size: {
                type: String
            },
            colours: {
                type: String
            },
            qty: {
                type: Number
            },
            amount: {
                type: Number
            },
            description: {
                type: String
            }
        },
        required: ['category','productName','brand','size','colours','qty','amount','description'],
        additionalProperties: true
    }

    const ajv= new Ajv()
    try {
        const validate= ajv.addSchema(productSchema).compile(productSchema)
        const valid= validate(req.body)
        if(!valid){
            console.log(validate.errors);
        }
    } catch (err) {
        console.log(err);
    }

    const data = req.body
    console.log(data,' ','Product',Product);
    const result= await Product.insertMany(data)
    console.log('result--',result);
}

const updateProducts= async(req,res)=>{
    try {
        const data = req.body
        console.log(data,' ','Product',Product)
        const result= await Product.findOneAndUpdate({_id:data._id},data,{new: true})
        console.log('result--',result);
    }catch (err) {
        console.log(err);
    }
}

const deleteProducts= async(req,res)=>{
    try {
        const data= req.body._id
        console.log(data,' ','Product',Product);
        const result= await Product.deleteOne({_id: data})
        console.log('result',result);
    } catch (err) {
        console.log(err);
    }
}

module.exports= {getProducts,createProducts,updateProducts,deleteProducts}