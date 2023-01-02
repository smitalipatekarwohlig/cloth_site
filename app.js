const mongoose = require('mongoose')
const express= require('express')
const app = express()

mongoose.connect('mongodb://localhost:27017/ClothSite').then(()=>{
    console.log('Clothing Site...');
}).catch((err)=>{
    console.log(err);
})

const Router= require('./routes/customer')
app.use(express.json())

app.use(Router)

app.listen(3000,()=>{
    console.log('Listening to the port 3000');
})