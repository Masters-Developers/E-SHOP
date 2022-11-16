const User = require("../models/auth")
const ErrorHandler= require("../utilities/errorHandler")
const catchAsyncErrors= require("../middleware/catchAsyncErrors")
const tokenEnviado = require("../utilities/jwtToken");
const sendEmail = require("../utilities/sendEmail")
const crypto = require("crypto")
const cloudinary= require("cloudinary")


//Create a new user  

exports.userRegistration= catchAsyncErrors(async (req, res, next) =>{
    const {name, email, password} = req.body;

    const result= await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder:"avatars",
        width:240,
        crop:"scale"
    })

    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:result.public_id,
            url:result.secure_url
        }
    })

    tokenEnviado(user,201,res)

})

//Login
exports.loginUser = catchAsyncErrors(async(req, res, next)=>{
    const { email, password} =  req.body;

    //check if the fields are complete
    if (!email || !password){
        return next(new ErrorHandler("Please enter your email and password", 400))
    }

    //Find the user our databases 
    const user = await User.findOne({email}).select("+password")
    if(!user){
        return next(new ErrorHandler("Invalid email or password", 401))
    }

    //Compare passwords
    const contrasenaOK= await user.compararPass(password);

    if (!contrasenaOK){
        return next(new ErrorHandler("Invalid password",401))
    }

    tokenEnviado(user,200,res)

})

//Logout
exports.logOut = catchAsyncErrors(async(req, res, next)=>{
    res.cookie("token",null, {
         expires: new Date(Date.now()),
         httpOnly: true
    })

    res.status(200).json({
        success:true,
        message: "logged out"
    })
})

//Forgot my password and recover password
exports.forgotPassword = catchAsyncErrors ( async( req, res, next) =>{
    const user= await User.findOne({email: req.body.email});

    if (!user){
        return next(new ErrorHandler("the user is not registered", 404))
    }
    const resetToken= user.genResetPasswordToken();
    
    await user.save({validateBeforeSave: false})

    //Create a url to reset the password
    const resetUrl= `${req.protocol}://${req.get("host")}/resetPassword/${resetToken}`;

    const mensaje=`Hi!\n\nYour link for a new password is this: \n\n${resetUrl}\n\n
    If you did not request this link, please contact support.\n\n Att:\n E-SHOP`

    try{
        await sendEmail({
            email:user.email,
            subject: "E-SHOP password recovery",
            mensaje
        })
        res.status(200).json({
            success:true,
            message: `email send to: ${user.email}`
        })
    }catch(error){
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;

        await user.save({validateBeforeSave:false});
        return next(new ErrorHandler(error.message, 500))
    }
})


//Reset password
exports.resetPassword = catchAsyncErrors(async (req,res,next) =>{
    //Hash el token que llego con la URl
    const resetPasswordToken= crypto.createHash("sha256").update(req.params.token).digest("hex")
    //We are looking for the user whose password we are going to reset
    const user= await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt: Date.now()}
    })
    //Is the user in the database?
    if(!user){
        return next(new ErrorHandler("The token is invalid or has already expired",400))
    }
    //Did we fill out the fields well?
    if(req.body.password!==req.body.confirmPassword){
        return next(new ErrorHandler("Passwords do not match",400))
    }

    //Set the new password
    user.password= req.body.password;
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;

    await user.save();
    tokenEnviado(user, 200, res)
})

//View user profile 
exports.getUserProfile= catchAsyncErrors( async (req, res, next)=>{
    const user= await User.findById(req.user.id);

    res.status(200).json({
        success:true,
        user
    })
})


//Update password (usuario logueado)
exports.updatePassword= catchAsyncErrors(async (req, res, next) =>{
    const user= await User.findById(req.user.id).select("+password");

    //Check if the old password is the same as the new one
    const itsTheSame = await user.compararPass(req.body.oldPassword)

    if (!itsTheSame){
        return next (new ErrorHandler("The current password is not correct", 401))
    }

    user.password= req.body.newPassword;
    await user.save();

    tokenEnviado(user, 200, res)
})


//Update user profile (logueado)
exports.updateProfile= catchAsyncErrors(async(req,res,next)=>{
    //Update user email 
    const newUserData ={
        nombre: req.body.nombre,
        email: req.body.email
    }

    //updata Avatar: 
    if (req.body.avatar !==""){
        const user= await User.findById(req.user.id)
        const image_id= user.avatar.public_id;
        const res= await cloudinary.v2.uploader.destroy(image_id);

        const result= await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width: 240,
            crop: "scale"
        })

        newUserData.avatar={
            public_id: result.public_id,
            url: result.secure_url
        }
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new:true,
        runValidators:true,
        useFindAndModify: false
    })

    res.status(200).json({
        success:true,
        user
    })
})


//Controllers services over users by the ADMIN

//View all users
exports.getAllUsers = catchAsyncErrors(async(req, res, next)=>{
    const users = await User.find();

    res.status(200).json({
        success:true,
        users
    })
})

//See the detail of one user
exports.getUserDetails= catchAsyncErrors(async(req, res, next)=>{
    const user= await User.findById(req.params.id);

    if (!user){
        return next(new ErrorHandler(`No user found with this id: ${req.params.id}`))
    }

    res.status(200).json({
        success: true,
        user
    })
})

//Update user profile like admin
exports.updateUser= catchAsyncErrors (async(req, res, next)=>{
    const nuevaData={
        nombre: req.body.nombre,
        email: req.body.email,
        role: req.body.rol
    }

    const user= await User.findByIdAndUpdate(req.params.id, nuevaData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success:true,
        user
    })
})

//Delete user  (admin)
exports.deleteUser= catchAsyncErrors (async (req, res, next)=>{
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User with id: ${req.params.id} 
        not found in our database`))
    }

    await user.remove();

    res.status(200).json({
        success:true,
        message:"User deleted successfully"
    })
})

