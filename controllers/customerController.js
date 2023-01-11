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
    "$id": "/customerSchema",
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
    "$id": "/updateCustomerSchema",
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
      const customer = await Customer.findById({ _id: data._id })
      if (!customer) {
        throw new Error('ID not found')
      } else {
        const result = await Customer.updateOne(customer, { new: true })
        console.log('result', result)
        res.status(200).send('Customer has been updated successfully')
      }
    }
  } catch (err) {
    console.log(err.message)
    res.status(500).json(err.message)
  }
}

const deleteCustomer = async (req, res) => {
  try {
    const data = req.body
    console.log(data, ' ', 'Customer', Customer)
    const customer = await Customer.findById({ _id: data._id })
    if (!customer) {
      throw new Error('Customer not found')
    } else {
      const result = await Customer.deleteOne(customer)
      console.log('result', result)
      res.status(200).send('Customer has been deleted successfully')
    }
  } catch (err) {
    console.log(err.message)
    res.status(500).json(err.message)
  }
}

module.exports = { getCustomer, createCustomer, updateCustomer, deleteCustomer }
