const mongoose = require('mongoose')
const validator = require('validator')

const customerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female']
  },
  mobileNo: {
    type: Number,
    validate (value) {
      if (value < 0) {
        throw new Error('cannot accept negative values')
      }
    },
    required: true,
    unique: true
  },
  email: {
    type: String,
    validate (value) {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid Email')
      }
    },
    unique: true,
    required: true
  },
  address: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Customer', customerSchema)
