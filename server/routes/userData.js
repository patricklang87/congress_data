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
    console.log('patch reached', req.body);
    let response;
    if (req.body.short_title === "Rep.") response = await User.updateOne({username: req.user.username}, { $addToSet : { 'interests.legislators.congresspeople': req.body }} ); 
    if (req.body.short_title === "Sen." ) response = await User.updateOne({username: req.user.username}, { $addToSet : { 'interests.legislators.senators': req.body }} );
    
    console.log("response:", response);
});

router.delete('/untrackLegislator', isAuth, async (req, res, next) => {
    console.log('untrack Legislator', req.body);
    let response;
    if (req.body.short_title === "Rep.") response = await User.updateOne({username: req.user.username}, { $pull: { 'interests.legislators.congresspeople': { "id": req.body.id } } } );
    if (req.body.short_title === "Sen.") response = await User.updateOne({username: req.user.username}, { $pull: {'interests.legislators.senators': {"id": req.body.id} }});
    
    console.log("response:", response);
});

router.patch('/trackSubject', isAuth, async (req, res, next) => {
    console.log('patch reached', req.body);
    const response = await User.updateOne({username: req.user.username}, { $addToSet : { 'interests.subjects': req.body }} );
    
    console.log("response:", response);
});

router.delete('/untrackSubject', isAuth, async (req, res, next) => {
    console.log('untrack Subject', req.body);
    const response = await User.updateOne({username: req.user.username}, { $pull: { 'interests.subjects': req.body } } );
    
    console.log("response:", response);
});

module.exports = router;