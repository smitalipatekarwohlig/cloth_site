const mongoose= require('mongoose');
const { createCustomer } = require('./ClothSiteMvc/controllers/customerController');

mongoose.connect("mongodb://localhost:27017/ClothSite").then(()=>{
    console.log("Clothing Site..");
}).catch((err)=>{
    console.log(err);
})

const createCustomer= async()=>{
    try {
        const customer1= new Customer({
            name : "Smitali",
            gender: "Female",
            mobileNo: 12345,
            email: "smitali@gmail.com",
            address: "304/B,ShubhSrushti Apt.,gandhi chowk,Mumbai"
         })

         const result= await customer1.save()
         console.log(result); 

    } catch (err) {
        console.log(err);
    }
}

createCustomer();