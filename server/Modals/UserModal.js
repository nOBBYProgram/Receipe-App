const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
   username:{
    type:String,
    required:true
   },
   email:{
    type:String,
    required:true
   },
   password:{
    type:String,
    required:true
   },
   img:{
      type:String
   },
   isAdmin:{
    type:Boolean,
    default:false
   },
   receipes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Receipe'
   }]

})

const User = mongoose.model('User',UserSchema)

module.exports = User