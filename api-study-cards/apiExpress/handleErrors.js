
module.exports = function handleErrors(req, res, next) {
    process.on('uncaughtException', () => {
        console.log('uncaughtException: an error has occured');

    })

    process.on('unhandledRejection', () => {
        console.log('unhandledRejection: an error has occured');

    })

    next();

}
