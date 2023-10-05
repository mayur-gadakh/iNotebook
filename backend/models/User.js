const mongoose = require('mongoose');
const { Date } = require('mongoose/lib/schema/index');
const {Schema}=mongoose;

const UserSchema = new Schema({
    
    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    Date:{
        type:Date,
        default:Date.now
    }
  });

  const User=mongoose.model('user',UserSchema);
  User.createIndexes();
  module.exports=mongoose.model('user',UserSchema);