const isAuth = (req ,res, next) => {
    console.log(req)
    if (req.isAuthenticated()) {
        return next();
    }
    res.send('Not Authenticated....');
}

module.exports = {isAuth};