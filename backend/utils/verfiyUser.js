import jwt from 'jsonwebtoken';
import customError from './error.js';
const verifyToken = (req, res, next) => {
    const token = req.cookies.my_cookie;
    if (!token) {
        return next(customError('Forbidden', 403));
    }
    jwt.verify(token, process.env.JWT_SEC_KEY, (err, user) => {
        if (err) {
            return next(customError('Unauthorized', 401));
        }
        req.user = user;
        next();
    });
};
export default verifyToken
