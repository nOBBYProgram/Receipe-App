const express = require('express');
const router = express.Router();
const User = require('../Modals/UserModal')
 router.get('/users',async(req,res)=>{
    try{
const users = await User.find()
res.status(200).send(users)
    }
    catch(err){
        throw(err)
    }
 })
  router.get('/find/:id',async(req,res)=>{
    try{

        const  user =await User.findById(req.params.id)
        res.status(200).send(user)
    }
    catch(err){
        throw(err)
    }
  })

  router.put('/update/:id',async(req,res)=>{
    try{
const updateduser = await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
res.status(200).send(updateduser)
    }
    catch(err){
        throw(err)
    }
  })
  module.exports = router;