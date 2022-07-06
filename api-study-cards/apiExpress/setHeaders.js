module.exports = function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000, client');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST');
    res.setHeader('Access-Control-Allow-Headers', 'content-type')

    next();
}