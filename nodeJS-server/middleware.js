function logRequest(req, res, next, host, port){
    console.log(`${req.method}::http://${host}${req.url}:${port}`);
    next();
}


module.exports = {logRequest};