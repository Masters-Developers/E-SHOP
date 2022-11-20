const sendToken= (user, statusCode, res) =>{

    //Creamos el token
    const token = user.getJwtToken();

    //Token'S Options
    const Options= {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES_TIME*24*60*60*1000
        ),
        httpOnly: true
    }

    res.status(statusCode).cookie("token", token, Options).json({
        success:true,
        token,
        user
    })
}
<<<<<<< HEAD
module.exports = sendToken;
=======
module.exports= tokenEnviado;
>>>>>>> e6e6ad49fbc8d076d805bd2b088b190e2f68404e
