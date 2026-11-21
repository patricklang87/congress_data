const express = require('express');
const router = express.Router();
const User = require('../schemes/user');
const passport = require('passport');
const { isAuth } = require('../middlewares/isAuth');


router.get('/data', isAuth, async (req, res, next) => {
    try {
        User.findOne({ username: req.user.username }, async (err, doc) => {
            if (err) throw err;
            if (doc) res.send({msg: "Logged In", username: doc.username, interests: doc.interests});
        });
    } catch (err) {
        console.log(err);
    }
});


router.patch('/trackLegislator', isAuth, async (req, res, next) => {
    let response;
    if (req.body.short_title === "Rep.") response = await User.updateOne({username: req.user.username}, { $addToSet : { 'interests.legislators.congresspeople': req.body }} ); 
    if (req.body.short_title === "Sen." ) response = await User.updateOne({username: req.user.username}, { $addToSet : { 'interests.legislators.senators': req.body }} );
    if (!response) return res.status(400).send({msg: "short_title must be Rep. or Sen."});
    res.send(response);
});

router.delete('/untrackLegislator', isAuth, async (req, res, next) => {
    let response;
    if (req.body.short_title === "Rep.") response = await User.updateOne({username: req.user.username}, { $pull: { 'interests.legislators.congresspeople': { "id": req.body.id } } } );
    if (req.body.short_title === "Sen.") response = await User.updateOne({username: req.user.username}, { $pull: {'interests.legislators.senators': {"id": req.body.id} }});
    if (!response) return res.status(400).send({msg: "short_title must be Rep. or Sen."});
    res.send(response);
});

router.patch('/trackSubject', isAuth, async (req, res, next) => {
    const response = await User.updateOne({username: req.user.username}, { $addToSet : { 'interests.subjects': req.body.subject }} );
    res.send(response);
});

router.delete('/untrackSubject', isAuth, async (req, res, next) => {
    const response = await User.updateOne({username: req.user.username}, { $pull: { 'interests.subjects': req.body.subject } } );
    res.send(response);
});

router.patch('/bookmarkBill', isAuth, async (req, res, next) => {
    const response = await User.updateOne({username: req.user.username}, { $addToSet : { bookmarks: req.body.bill }} );
    res.send(response);
    
});

router.delete('/unbookmarkBill', isAuth, async (req, res, next) => {
    const response = await User.updateOne({username: req.user.username}, { $pull: { bookmarks: {bill_id: req.body.bill.bill_id} } } );
    res.send(response);
    
});

module.exports = router;