const mongoose = require('mongoose')
const User = require('./UserModal')
const ReceipeSchema = new mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:User,
    required:true
  },
   username:{
    type:String
   },
   img:{
    type:String
   },
    desc: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
   cat:{
    type:Array
   },
   integrents :{
    type:Array
   }
 
   },
      
      
{
          timestamps:true
      
    }
  );
  
  const Receipe = mongoose.model('Receipe', ReceipeSchema);

  module.exports = Receipe
