const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if(!token) {
        return res.status(401).json({ message:"Access denied, no token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_Secret);
        // console.log(decoded);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        res.status(400).json({ message:"Invalid Token" })
    }
}

module.exports = authMiddleware;