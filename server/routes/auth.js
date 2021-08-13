const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../schemes/user');
const { isAuth } = require('../middlewares/isAuth');




module.exports = router;