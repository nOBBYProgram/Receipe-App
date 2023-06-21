const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
   username:{
    type:String,
    required:true
   },
 
receipeId:{
type:mongoose.Schema.Types.ObjectId,
ref:'Receipe',
required:true
},
   content: {
      type: String,
     required:true
   }

})

const Comment = mongoose.model('Comment',CommentSchema)

module.exports = Comment