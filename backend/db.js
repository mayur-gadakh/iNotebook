const mongoose=require("mongoose");

const mongooseURI="mongodb://127.0.0.1:27017/inotebook";


const connectToMongoo =()=>{
 
 mongoose.connect(mongooseURI);
console.log("mongo connected");

}

module.exports=connectToMongoo;