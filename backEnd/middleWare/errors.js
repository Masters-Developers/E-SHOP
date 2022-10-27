const ErrorHandler = require('../utilities/errorHandler')

module.exports =(err, req, res, next) => {
    err.statusCode= err.statusCode || 500;
    err.message = err.message || "internal server error";

    res.statusCode(err.statusCode).json({
        succes:false,
        message:err
    })
}