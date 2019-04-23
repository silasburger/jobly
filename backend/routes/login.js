const express = require('express');
const User = require('../models/User.js')
const router = new express.Router();
const createToken = require('../helpers/createToken');

router.post('/', async function(req, res, next) {
  try {
    const user = await User.login(req.body)
    const token = createToken(user);
    return res.json({token});
  } catch (e) {
    return next(e);  }
});

module.exports = router;