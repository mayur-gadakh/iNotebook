
const connectToMongoo=require("./db");
const express = require('express')
var cors = require('cors')



connectToMongoo();

const app = express()
const port = 5000;
app.use(cors())


app.use(express.json());//this is the middleware for sending the request

app.use('/api/auth',require('./routes/auth'));//this is the path to accesing the files
app.use('/api/notes',require('./routes/notes'));

app.listen(port, () => { //this is for listing the port  
  console.log(`Example app listening on port ${port}`)
})