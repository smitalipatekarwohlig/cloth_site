const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ['Men', 'Women', 'Girl', 'Boy']
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
    default: 0
  },
  amount: {
    type: Number,
    required: true
  },
  description: {
    type: String
  }
})

module.exports = mongoose.model('Product', productSchema)
