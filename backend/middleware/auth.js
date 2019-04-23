const jwt = require("jsonwebtoken");
const {SECRET} = require('../config');

/** Middleware: Requires user is logged in. */

function ensureLoggedIn(req, res, next) {
  try {
    const tokenFromReq = req.body._token || req.query._token;
    jwt.verify(tokenFromReq, SECRET);
    return next();
  }

  catch (err) {
    return next({ status: 401, message: "Unauthorized" });
  }
}

function ensureCorrectUser(req, res, next) {
  try {
    const tokenFromReq = req.body._token || req.query._token;
    const token = jwt.verify(tokenFromReq, SECRET);
    if(token.username === req.params.username){
      return next();
    } else {
      throw new Error();
    }
  }

  catch (err) {
    return next({ status: 401, message: "Unauthorized" });
  }
}

function isAdmin(req, res, next) {
  try {
    const tokenFromReq = req.body._token || req.query._token;
    const token = jwt.verify(tokenFromReq, SECRET);
    if(token.isAdmin === true) {
      return next();
    } else {
      throw new Error();
    }
  } 

  catch (err) {
    return next({ status: 401, message: "Unauthorized" });
  }
}

module.exports = {
  ensureLoggedIn,
  ensureCorrectUser,
  isAdmin
}