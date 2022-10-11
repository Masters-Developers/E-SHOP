const app=require("./app")
// const express = require("express")
// const app = express()
const connectDatabase = require("./config/database.js");

//Set the config file
const dotenv=require("dotenv");
dotenv.config({path: 'backEnd/config/config.env'})

//SETTINGS DATABASE
connectDatabase();

//CALLING SERVER
const server=app.listen(process.env.PORT, () => {
    console.log(`Server started in port: ${process.env.PORT} in mode: ${process.env.NODE_ENV}`)
})
// app.listen(4000)
// console.log(`server in port: ${4000}`)