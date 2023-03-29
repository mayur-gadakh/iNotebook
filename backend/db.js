const mongoose=require("mongoose");

const mongooseURI="mongodb://0.0.0.0:27017/inotebook";


const connectToMongoo =()=>{
 
 mongoose.connect(mongooseURI);
console.log("mongo connected");

}

module.exports=connectToMongoo;