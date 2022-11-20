const User = require ("../models/auth")
const jwt=require("jsonwebtoken")
const ErrorHandler=require ("../utilities/errorHandler")
const catchAsyncErrors= require("../middleware/catchAsyncErrors")

//existence and veracity of the token 
exports.isAuthenticatedUser= catchAsyncErrors(async (req, res, next)=>{
    const {token}= req.cookies
    if(!token){
        return next(new ErrorHandler("You must be logged in to access this resource", 401))
    }
    const decodificada = jwt.decode(token, process.env.JWT_SECRET)
    req.user=await User.findById(decodificada.id);
    next()
})

//Capture role
exports.authorizeRoles= (...roles) =>{
    return (req, res, next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Rol (${req.user.role}) You are not authorized to enter this area`,403))
        }
        next()
    }
}