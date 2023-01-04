const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT

mongoose.connect(process.env.DATABASE_URL).then(() => {
  console.log('DB connected successfully...')
}).catch((err) => {
  console.log(err)
})

const Router = require('./routes/customer')
app.use(express.json())

app.use(Router)

app.listen(PORT, () => {
  console.log(`Listening to the port  ${PORT}`)
})
