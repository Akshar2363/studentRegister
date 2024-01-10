const jwt = require('jsonwebtoken');
const fetchUser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({ error: "Invalid Authentication Token" });
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid Authentication Token" });
    }
}
module.exports = fetchUser;
