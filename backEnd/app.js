const express=require("express");
const app = express();
const errorMiddleWare = require('./middleWare/errors')
app.use(express.json());

//Import routes
const items=require("./routes/item")
const user=require("./routes/auth")
app.use('/api',items) //set route
app.use('/api', user)
app.use(errorMiddleWare)
module.exports=app