const express = require('express')

const router = express.Router()
const Receipe = require('../Modals/ReceipeModal')
const Comment = require('../Modals/CommentModal')
router.post('/create/:receipeId',async(req,res)=>{
    const {receipeId} = req.params
    const receipe =await Receipe.findById(receipeId)
   
    try{

const {content} = req.body

if(!receipe){
    res.status(200).send("Receipe not found")
}

const comment = new Comment ({
    username:receipe.username,
    content,
    receipeId:receipe._id
})
await comment.save()
res.status(200).send(comment)
    }
    catch(err){
        throw(err)
    }
})

router.get('/comment/:receipeId',async(req,res)=>{
    try{
const {receipeId} = req.params
const comments = await Comment.find({receipeId})

res.status(200).send(comments)
    }
    catch(err){
        throw(err)
    }
})
module.exports = router;