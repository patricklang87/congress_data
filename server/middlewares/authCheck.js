const checkAuthenticated = (req, res, next) => {
    console.log("::auth check::", req.user);
    if (req.isAuthenticated()) {
        return next();
    }
    res.send({msg: "Not Authenticated"});
}

const checkNotAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.send({msg: "Already Authenticated"});
    }
    next();
}

module.exports = {checkAuthenticated, checkNotAuthenticated};