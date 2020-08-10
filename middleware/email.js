const jwtSecret = require('../config/keys').jwtSecret2;
const jwt = require('jsonwebtoken');

const emailAuth = (req, res, next) => {
    const token = req.header('email-token');

    try {
        const decoded = jwt.verify(token, jwtSecret);
        return res.status(401).json({ msg: 'Please wait 60 seconds' });
    } catch(e) {
        req.status = false;
        next();
    }
}

module.exports = emailAuth;