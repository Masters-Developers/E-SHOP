const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt= require("jsonwebtoken")
const crypto= require ("crypto")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Write your name"],
        maxlength: [120, "The name can not exceed 120 characters"]
    },
    email: {
        type: String,
        required: [true, "Please wirte your Email"],
        unique: true,
        validate: [validator.isEmail, "Please write a valid email"]
    },
    
    password: {
        type: String,
        required: [true, "please select a password"],
        minlength: [8, "Your password must have more than 8 characters"],
        select: false
    },
    photo: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    registryDate: {
        type: Date,
        default: Date.now
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date

})

//Encript password before save 
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

//Decode and compare password
userSchema.methods.compararPass = async function (passDada){
    return await bcrypt.compare(passDada, this.password)
}

//Return a JWT token
userSchema.methods.getJwtToken = function (){
    return jwt.sign({id: this.id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_TIEMPO_EXPIRACION
    })
}

//Generate a token for reset password
userSchema.methods.genResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString("hex")

    //resetToken
    this.resetPasswordToken= crypto.createHash("sha256").update(resetToken).digest('hex')

    ///Set token expiration date
    this.resetPasswordExpire= Date.now() + 30*60*1000 

    return resetToken

}

module.exports = mongoose.model("auth", userSchema)