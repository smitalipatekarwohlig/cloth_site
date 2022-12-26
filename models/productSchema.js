const mongoose = require('mongoose')
const {Schema} = mongoose

mongoose.connect("mongodb://localhost:27017/ClothSite").then(()=>{
    console.log("Clothing Site...");
}).catch((err)=>{
    console.log(err);
})

const productSchema= new mongoose.Schema({
    category: {
        type: String,
        enum: ["Mens","Womens","Girls","Boys"]
    },
    productName: {
        type: String,
        unique: true
    },
    brand: { 
        type: String
    },
    size: {
        type: String,
        required: true
    },
    colours: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true,
        default: 1,
        enum: ["In Stock","Out of Stock"]
    },
    amount: {
        type: Number,
        required: true
    },
    decription: {
        type: String
    }
})

module.exports= mongoose.model("Product",productSchema)