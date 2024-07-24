const jwt = require('jsonwebtoken');

function authMiddle ( req, res, next ) {
    const token = req.cookies.token;
    if (!token) return res.status(401).send('Access denied. No token Provided.');

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
        
    } catch (error) {
        res.status(400).send('Invalid token.');
    }
}

module.exports = authMiddle;