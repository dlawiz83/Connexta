const errorHandler  = (err, req,res, next)=> {
    const statusCode = statusCode ? statusCode: 500;
    res.status(statusCode);
    res.json({
        message:err.message,
    })

}

module.exports = {
    errorHandler
}