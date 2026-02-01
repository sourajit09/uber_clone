const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const BlacklistToken = require('../models/blacklistToken.model');
const jwt = require('jsonwebtoken');
const Captain = require('../models/captain.model');

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.header('Authorization')?.split(' ')[1];
    console.log("Auth Middleware Token:", token); 
        if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
        // Check if token is blacklisted
        const isBlacklisted = await blacklistToken.findOne({ where: { token } });
        console.log(isBlacklisted);
        
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

module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const isBlacklisted = await BlacklistToken.findOne({ where: { token: token } });
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized: Token is blacklisted' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        
        const captain = await Captain.findByPk(decoded.id);
        req.captain = captain;

        if (!captain) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.captain = captain; // Attach captain to request object
        return next();
    } catch (error) {
        console.log(error)
        return res.status(401).json({ message: 'Unauthorized' });
    }
}