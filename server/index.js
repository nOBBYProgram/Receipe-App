const express = require('express')
const app  = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Receipe = require('./Routes/ReceipeRoute')
const users = require('./Routes/UserRoute')
const auth = require('./Routes/auth')
const comment = require('./Routes/CommentRoute')
const cookieParser = require('cookie-parser');
const cors = require('cors')
dotenv.config();

// const router = require('./Routes/ReceipeRoute')
const connectMongodDb = async()=>{
    try{
        await mongoose.connect(process.env.Mongodb);
        console.log("Connected to MongoDb database!")
    }
    catch(err){
        throw(err)
    }
}
app.use(cors())
app.use(cookieParser());
app.use(express.json());
app.use('/receipe',Receipe)
app.use('/auth',auth)
app.use('/users',users)
app.use('/comments',comment)

// app.use(router)

app.listen(5000,()=>{
    connectMongodDb()
    console.log("Connnected to backend server!")
})