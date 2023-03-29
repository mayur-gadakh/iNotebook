const { Date } = require('mongoose/lib/schema/index');
const mongoose = require('mongoose');
const {Schema}=mongoose;



const NoteSchema = new Schema({

    user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
    },
    title:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true,
        
    },
    tags:{
        type:String,
        required:true,
        
    },
    Date:{
        type:Date,
        default:Date.now
    }
  });
 // const Notes=mongoose.model('notes',NoteSchema);
 // Notes.createIndexes();
  module.exports=mongoose.model('notes',NoteSchema);