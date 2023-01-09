const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const Router = require('./routes/customer')
const PORT = process.env.PORT

mongoose.connect(process.env.DATABASE_URL).then(() => {
  console.log('DB connected successfully...')
}).catch((err) => {
  console.log(err)
})

app.use(express.json())

app.use(Router)

function addUniqueId(req,res,next) {
  req.header = '643423'
  next()
}

app.use(addUniqueId)

app.listen(PORT, () => {
  console.log(`Listening to the port  ${PORT}`)
})
