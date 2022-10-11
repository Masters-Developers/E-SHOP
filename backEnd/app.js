const express=require("express");
const app = express();

app.use(express.json());

//Import routes
const items=require("./routes/item")

app.use('/api',items) //set route

module.exports=app