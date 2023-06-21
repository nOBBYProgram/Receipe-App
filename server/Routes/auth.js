const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt')
const User = require('../Modals/UserModal')
const jwt = require('jsonwebtoken')
router.post('/register',async(req,res)=>{
    const newUser = new User(req.body)
    try{
const saltRounds = 10;
const salt = await bcrypt.genSalt(saltRounds)

const hashedPassword = await bcrypt.hash(newUser.password,salt)
newUser.password = hashedPassword;
await newUser.save()
res.status(200).send(newUser)
    }
    catch(err){
        throw(err)
    }
})

router.post('/login',async(req,res)=>{
    try{
        const user =await User.findOne({username : req.body.username});
        if(!user){
  return res.status(500).json({success:false,message:"Wrong Username!"})
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if(!isMatch){
 return  res.status(404).json({success:false,message:"Incorrect Password"})
        }
        const token = jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.specialKey);
        res.cookie('token',token,{httpOnly:true});
        const {password,isAdmin,...otherDetails} = user._doc
        res.status(200).json({success:true,otherDetails,token});
     
       }
       catch(err){
        return   res.status(500).send("You are doind it wrong!")
       }
       
})

module.exports = router