const isAuth = (req ,res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.send('Not Authenticated....');
}

module.exports = {isAuth};