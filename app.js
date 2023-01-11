const mongoose = require('mongoose')
const dotenv = require('dotenv')
const express = require('express')
const app = express()
const Router = require('./routes/customer')

const PORT = process.env.PORT || 3000
dotenv.config()

mongoose.connect(process.env.DATABASE_URL).then(() => {
  console.log('DB connected successfully...')
}).catch((err) => {
  console.log(err)
})

app.use(express.json())

app.use(Router)

app.listen(PORT, () => {
  console.log(`Listening to the port  ${PORT}`)
})
