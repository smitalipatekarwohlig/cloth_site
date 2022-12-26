const mongoose = require('mongoose')
const {Schema} = mongoose

// mongoose.connect("mongodb://localhost:27017/ClothSite").then(()=>{
//     console.log("Clothing Site...");
// }).catch((err)=>{
//     console.log(err);
// })

const paymentsSchema= new mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "orderSchema"
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customerSchema"
    },
    amount: {
        type: Number
    },
    subtotal: {
        type: Number
    },
    tax: {
        type: Number
    },
    paymentType: {
        type: String,
        enum: ["COD","Debit Card","Credit Card"],
        required: true
    },
    status: {
        type: String,
        enum: ["paid","unpaid"],
        required: true
    }
})

module.exports= mongoose.model("Payments",paymentsSchema)