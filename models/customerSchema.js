const mongoose = require('mongoose')

const customerSchema=  mongoose.Schema({
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