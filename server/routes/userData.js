const express = require('express');
const router = express.Router();
const User = require('../schemes/user');
const passport = require('passport');
const authCheck = require('../middlewares/authCheck');

router.get('/data', (req, res, next) => {
    try {
        res.send({mesg: 'req received', data: req.user});
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;