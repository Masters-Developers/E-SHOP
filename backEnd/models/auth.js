const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")

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
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})


module.exports = mongoose.model("auth", userSchema)