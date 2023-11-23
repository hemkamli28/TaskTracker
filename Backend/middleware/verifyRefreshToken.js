require('dotenv').config()
const jwt = require('jsonwebtoken');

const verifyRefreshToken = async (req, res, next) => {
    const { refreshToken }= req.body;
    try {
        if (!refreshToken) {
            throw new Error("No refresh-token provided");
        }
        const data = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
        req.user = data.user;
        next();
        
    } catch (err) {
        console.error(err);

        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token expired" });
        }

        return res.status(403).json({ message: "Invalid token or token expired!" });
    }
};

module.exports = {verifyRefreshToken};
