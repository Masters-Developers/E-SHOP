const app=require("./app")
const connectDatabase = require("./config/database.js");

//Set the config file
const dotenv=require("dotenv");
dotenv.config({path: 'backEnd/config/config.env'})

//SETTINGS DATABASE
connectDatabase();

//CALLING SERVER
const server=app.listen(process.env.PORT, () => {
    console.log(`Server started in PORT: ${process.env.PORT} in mode: ${process.env.NODE_ENV}`)
})