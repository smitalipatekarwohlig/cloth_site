const Product = require('../models/productSchema')
const Ajv = require('ajv')

const getProducts = async (req, res) => {
  try {
    const result = await Product.find()
    res.status(200).json(result)
  } catch (err) {
    console.log(err)

    res.status(500).json( err.message)
  }
}

const createProducts = async (req, res) => {
  const productSchema = {
    type: 'object',
    properties: {
      category: {
        type: 'string'
      },
      productName: {
        type: 'string'
      },
      brand: {
        type: 'string'
      },
      size: {
        type: 'string'
      },
      colours: {
        type: 'string'
      },
      qty: {
        type: 'number'
      },
      amount: {
        type: 'number'
      },
      description: {
        type: 'string'
      }
    },
    required: ['category', 'productName', 'brand', 'size', 'colours', 'qty', 'amount', 'description'],
    additionalProperties: true
  }

  const ajv = new Ajv()
  try {
    const validate = ajv.addSchema(productSchema).compile(productSchema)
    const valid = validate(req.body)
    if (!valid) {
      console.log(validate.errors)
    }
    const data = req.body
    console.log(data, ' ', 'Product', Product)
    const result = await Product.insertMany(data)
    console.log('result', result)
    res.status(200).send('Products has been created successfully')
  } catch (err) {
    console.log(err.message)
    res.status(500).json( err.message )
  }
}

const updateProducts = async (req, res) => {
  try {
    const data = req.body
    console.log(data, ' ', 'Product', Product)
    const result = await Product.updateOne({ _id: data._id }, data, { new: true })
    console.log('result', result)
    res.status(200).send('Product has been updated successfully')
  } catch (err) {
    console.log(err.message)
    res.status(500).json( err.message )
  }
}

const deleteProducts = async (req, res) => {
  try {
    const data = req.body._id
    console.log(data, ' ', 'Product', Product)
    const result = await Product.deleteOne({ _id: data })
    console.log('result', result)
    res.status(200).send('Product has been deleted successfully')
  } catch (err) {
    console.log(err.message)
    res.status(500).json( err.message )
  }
}

module.exports = { getProducts, createProducts, updateProducts, deleteProducts }
