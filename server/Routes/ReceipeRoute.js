const express = require('express')
const router = express.Router();
const Receipe = require('../Modals/ReceipeModal')
// const createNewReceipe  = require('../controller/createNewReceipe')
const User = require('../Modals/UserModal')
const verifyToken = require('../Routes/verify')

// router.post('/create',createNewReceipe)

router.post('/create',verifyToken, async(req,res)=>{
   const{desc,title,img,cat,integrents} = req.body
   console.log(req.body)
   console.log(req.user)
   const user =await User.findById(req.user.id)

    try{
      
         
               const newReceipe = new Receipe({
                userId :user.id,
           username:user.username,
           img,
           cat,integrents,
                  desc,
                  title,
                 
               });
               user.receipes.push(newReceipe._id)
               await user.save()
               await newReceipe.save();
               res.status(200).send(newReceipe)
       
         }
    catch(err){
        throw err
    }
})
router.get('/user/:id',async(req,res)=>{
    const receipes = await Receipe.find({userId:req.params.id})
    res.status(200).send(receipes)
    try{

    }
    catch(err){
        throw(err)
    }
})
// router.get("/usersinfo",async(req,res)=>{
//     try{
//         const recipe = await Receipe.findById("645efef94c32826f4340dbf7").populate('user','username');
//         res.status(200).send(recipe)
//     }
//     catch(err){
//         throw(err)
//     }
// })
router.get('/receipes',async(req,res)=>{

const {category,withintegrents,withoutintegrents} = req.query
    let query ={}
    try{
        if (category) {
            query.cat = { $in: [category] };
          }
      
          if (withintegrents) {
            const withIntegrentsArray = withintegrents.split(',').map((value) => value.trim());
            query.integrents = { $in: withIntegrentsArray };
          }
      
          if (withoutintegrents) {
            const withoutIntegrentsArray = withoutintegrents.split(',').map((value) => value.trim());
            query.integrents = { $nin: withoutIntegrentsArray };
          }
      
          let receipes = await Receipe.find(query).sort({ createdAt: -1 }).limit(4);

   res.status(200).send(receipes)
    }
    catch(err){
        throw err
    }
})
router.get('/find/:id',async(req,res)=>{
    try{
  const receipe = await Receipe.findById(req.params.id)
  res.status(200).send(receipe)
    }
    catch(err){
        throw(err)
    }
})
router.put('/:id',async(req,res)=>{
    try{
const updatedReceipe = await Receipe.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
res.status(200).send(updatedReceipe)
    }
    catch(err){
        throw(err)
    }
})
router.delete('/:id',async(req,res)=>{
    try{
await Receipe.findByIdAndDelete(req.params.id)
res.status(200).send("Receipe has been deleted succesfully!")
    }
    catch(err){
        throw(err)
    }
})
module.exports = router;