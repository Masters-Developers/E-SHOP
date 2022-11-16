const nodemailer= require("nodemailer")

const sendEmail = async options =>{
    const transport = nodemailer.createTransport({
        host: "smtp.office365.com",
        port: 587,
        auth: {
          user: "andythecat1328@hotmail.com",
          pass: "zgdonkzzmsmhmvky"
        }
      });
    const mensaje={
        from: "E-SHOP <andythecat1328@hotmail.com>",
        to: options.email,
        subject: options.subject,
        text: options.mensaje
    }

    await transport.sendMail(mensaje)
}

module.exports= sendEmail;