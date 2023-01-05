const Customer = require('../models/customerSchema')
const Ajv = require('ajv')

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
    type: 'object',
    properties: {
      name: {
        type: 'string'
      },
      gender: {
        type: 'string'
      },
      mobileNo: {
        type: 'number'
      },
      email: {
        type: 'string'
      },
      address: {
        type: 'string'
      }
    },
    required: ['name', 'gender', 'mobileNo', 'email', 'address'],
    additionalProperties: true
  }

  const ajv = new Ajv()
  try {
    const validate = ajv.addSchema(customerSchema).compile(customerSchema)
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
  try {
    const data = req.body
    console.log(data, ' ', 'Customer', Customer)
    const result = await Customer.findByIdAndUpdate({ _id: data._id }, data, { new: true })
    console.log('result', result)
    res.status(200).send('Customer has been updated successfully')
  } catch (err) {
    console.log(err.message)
    res.status(500).json(err.message)
  }
}

const deleteCustomer = async (req, res) => {
  try {
    const data = req.body._id
    console.log(data, ' ', 'Customer', Customer)
    const result = await Customer.deleteOne({ _id: data })
    console.log('result', result)
    res.status(200).send('Customer has been deleted successfully')
  } catch (err) {
    console.log(err.message)
    res.status(500).json(err.message)
  }
}

module.exports = { getCustomer, createCustomer, updateCustomer, deleteCustomer }
