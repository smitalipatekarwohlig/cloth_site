const mongoose = require('mongoose')
const {Schema} = mongoose

mongoose.connect("mongodb://localhost:27017/ClothSite").then(()=>{
    console.log("Clothing Site...");
}).catch((err)=>{
    console.log(err);
})

const customerSchema= new mongoose.Schema({
        name : {
            type: String,
            required: true
        },
        gender: {
            type: String,
            enum: ["male","female"]
        },
        mobileNo: {
            type: Number,
            required: true,
            unique: true
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        address: {
            type: String,
            required: true
        }
    })

    module.exports = mongoose.model("Customer",customerSchema)