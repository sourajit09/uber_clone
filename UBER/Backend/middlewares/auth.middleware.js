const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const blacklistToken = require('../models/blacklistToken.model');
const jwt = require('jsonwebtoken');

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
        // Check if token is blacklisted
        const isBlacklisted = await blacklistToken.findOne({ where: { token } });
        if (isBlacklisted) {
            return res.status(401).json({ message: 'Token is blacklisted. Please log in again.' });
        }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.id);
        if (!user) {
            return res.status(401).json({ message: 'Invalid token. User not found.' });
        }
        req.user = user;
        next();
    }
    catch (error) {{
        console.log("Auth Middleware Error:", error.message);
        return res.status(400).json({ message: 'unauthorized' });
    }
}
}