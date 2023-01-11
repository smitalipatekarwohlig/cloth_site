const Product = require('../models/productSchema')
const { json } = require('express')
const Ajv = require('ajv')
const JSON = new Ajv()

const getProducts = async (req, res) => {
  try {
    const result = await Product.find()
    res.status(200).json(result)
  } catch (err) {
    console.log(err)

    res.status(500).json(err.message)
  }
}

const createProducts = async (req, res) => {
  const createProdSchema = {
    "$id": "/createProdSchema",
    "type": "array",
    "required": [
      "category",
      "productName",
      "brand",
      "size",
      "colours",
      "qty",
      "amount",
      "description"
    ],
    "additionalProperties": true,
    "properties": {
      "category": {
        "type": "string"
      },
      "productName": {
        "type": "string"
      },
      "brand": {
        "type": "string"
      },
      "size": {
        "type": "string"
      },
      "colours": {
        "type": "string"
      },
      "qty": {
        "type": "integer"
      },
      "amount": {
        "type": "integer"
      },
      "description": {
        "type": "string"
      }
    }
  }

  try {
    const validate = JSON.addSchema(createProdSchema).compile(createProdSchema)
    const valid = validate(req.body)
    if (!valid) {
      console.log(validate.errors)
    } else {
      const data = req.body
      console.log(data, ' ', 'Product', Product)
      const result = await Product.insertMany(data)
      console.log('result', result)
      res.status(200).send('Products has been created successfully')
    }
  } catch (err) {
    console.log(err.message)
    res.status(500).json(err.message)
  }
}

const updateProducts = async (req, res) => {
  const updateProdSchema = {
    "$id": "/updateProdSchema",
    "type": "object",
    "required": [
      "category",
      "productName",
      "brand",
      "size",
      "colours",
      "qty",
      "amount",
      "description"
    ],
    "additionalProperties": true,
    "properties": {
      "category": {
        "type": "string"
      },
      "productName": {
        "type": "string"
      },
      "brand": {
        "type": "string"
      },
      "size": {
        "type": "string"
      },
      "colours": {
        "type": "string"
      },
      "qty": {
        "type": "integer"
      },
      "amount": {
        "type": "integer"
      },
      "description": {
        "type": "string"
      }
    }
  }
  try {
    const validate = JSON.addSchema(updateProdSchema).compile(updateProdSchema)
    const valid = validate(req.body)
    if (!valid) {
      res.status(400).json(validate.errors)
    } else {
      const data = req.body
      console.log(data, ' ', 'Product', Product);
      const product = await Product.findOne({ _id: data._id }, data, { new: true })
      if (!product) {
        console.log(123)
        throw new Error('Id is not valid')

      } else {
        const result = await Product.updateOne(product)
        console.log('result', result);
        res.status(200).send('Product has been updated successfully')
      }
    }
  } catch (err) {
    console.log(err.message)
    res.status(500).json(err.message)
  }
}

const deleteProducts = async (req, res) => {
  try {
    const data = req.body
    console.log(data, ' ', 'Product', Product);
    const product = await Product.findOne({ _id: data._id })
    if (!product) {
      throw new Error('Product not found')
    } else {
      const result = await Product.deleteOne(product)
      console.log('result', result)
      res.status(200).send('Product has been deleted successfully')
    }
  } catch (err) {
    console.log(err.message)
    res.status(500).json(err.message)
  }
}

module.exports = { getProducts, createProducts, updateProducts, deleteProducts }
