const Customer = require('../models/customerSchema')
const Ajv = require('ajv')
const { json } = require('express')
const customerSchema = require('../models/customerSchema')
const JSON = new Ajv()

const getCustomer = async (req, res) => {
  try {
    const result = await Customer.find()
    console.log('result', result)
    res.status(200).json(result)
  } catch (err) {
    console.log(err)
    res.status(500).json(err.message)
  }
}

const createCustomer = async (req, res) => {
  const customerSchema = {
    "$id": "http://example.com/customerSchema.json",
    "type": "object",
    "required": [
      "name",
      "gender",
      "mobileNo",
      "email",
      "address"
    ],
    "additionalProperties": true,
    "properties": {
      "name": {
        "type": "string"
      },
      "gender": {
        "type": "string"
      },
      "mobileNo": {
        "type": "integer"
      },
      "email": {
        "type": "string"
      },
      "address": {
        "type": "string"
      }
    }
  }

  try {
    const validate = JSON.addSchema(customerSchema).compile(customerSchema)
    const valid = validate(req.body)
    if (!valid) {
      console.log(validate.errors)
    } else {
      const data = req.body
      console.log(data, ' ', 'Customer', Customer)
      const result = await Customer.insertMany(data)
      console.log('result', result)
      res.status(200).send('Customer has been created successfully')
    }
  } catch (err) {
    console.log(err.message)
    res.status(500).json(err.message)
  }
}

const updateCustomer = async (req, res) => {
  const updateCustSchema = {
    "$id": "http://example.com/updateCustSchema.json",
    "type": "object",
    "required": [
      "name",
      "gender",
      "mobileNo",
      "email",
      "address"
    ],
    "additionalProperties": true,
    "properties": {
      "name": {
        "type": "string"
      },
      "gender": {
        "type": "string"
      },
      "mobileNo": {
        "type": "integer"
      },
      "email": {
        "type": "string"
      },
      "address": {
        "type": "string"
      }
    }
  }
  try {
    const validate = JSON.addSchema(updateCustSchema).compile(updateCustSchema)
    const valid = validate(req.body)
    if (!valid) {
      res.status(400).json(validate.errors)
    } else {
      const data = req.body
      console.log(data, ' ', 'Customer', Customer);
      await Customer.findById({ _id: data._id })
      if (!data._id) {
        res.status(400).send(err.message('Id is not valid'))
      } else {
        const result = await Customer.updateOne({ _id: data._id }, data, { new: true })
        console.log('result', result)
        res.status(200).send('Customer has been updated successfully')
      }
    }
  } catch (err) {
    console.log(err.message)
    res.status(500).json(err.message)
  }
}

const deleteCustomer = async(req, res) => {
  try {
    const data = req.body._id
    if (!data) {
      res.status(400).send('Customer not found')
    } else {
      console.log(data, ' ', 'Customer', Customer)
      const result = await Customer.deleteOne({ _id: data })
      console.log('result', result)
      res.status(200).send('Customer has been deleted successfully')
    }
  } catch (err) {
    console.log(err.message)
    res.status(500).json(err.message)
  }
}

module.exports = { getCustomer, createCustomer, updateCustomer, deleteCustomer }
