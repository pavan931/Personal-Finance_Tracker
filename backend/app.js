const express = require('express');
const router = require('./routes/userRouter');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const app = express();

dotenv.config();
const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("MongoDB connected Successfully")
}).catch((error)=>{
    console.log("Error : ",error )
})

// ! Middlewares

app.use(express.json()) //Pass incoming json data

// ! Routes

app.use('/',router)

app.listen(PORT,()=>{
    console.log(`Server Started and Running at. ${PORT}`);
    
})