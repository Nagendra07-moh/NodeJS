const mongoose = require('mongoose');

//STEP-1 => MOONGOOSE SCHEMA

const userSchema = new mongoose.Schema({
   firstName:{
      type: String,
      require: true
   },
   lastName:{
      type: String,
      require:true
   },
   email:{
      type:String,
      require: true,
      unique:true
   },
   jobTitle:{
      type:String,
       
   },
   gender:{
      type:String
   }
})



// STEP-2 => MOngo db Model   (after making the schema you need to pass it into a model)

const user = mongoose.model("user",userSchema); //using this user model we can be able to intereact with out mongo database~!


module.exports = User;