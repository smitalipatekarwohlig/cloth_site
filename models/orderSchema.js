const mongoose = require('mongoose')
const {Schema} = mongoose

mongoose.connect("mongodb://localhost:27017/ClothSite").then(()=>{
    console.log("Clothing Site...");
}).catch((err)=>{
    console.log(err);
})

const orderSchema= new mongoose.Schema({
    orderId: {
        type: String,
        required: true
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customerSchema"
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "productsSchema"
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
    orderStatus: {
        type: String,
        enum: ["Pending","Shipped","Dispatch","Delivered"],
        required: true
    }
})

module.exports= mongoose.model("Order",orderSchema)