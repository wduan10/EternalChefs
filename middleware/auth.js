const jwtSecret = require("../config/keys").jwtSecret;
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token) return res.status(401).json({ msg: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded;
        next();
    } catch (e) {
        res.status(401).json({ msg: "Token invalid" });
    }
};

module.exports = auth;
