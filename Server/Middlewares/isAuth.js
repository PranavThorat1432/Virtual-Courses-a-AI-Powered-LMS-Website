import jwt from 'jsonwebtoken';

const isAuth = async (req, res, next) => {
    try {
        let {token} = req.cookies;
        if(!token) {
            return res.status(404).json({
                success: false,
                message: 'Token not found!'
            });
        }
    
        let verifyToken = await jwt.verify(token, process.env.JWT_SECRET);
        if(!verifyToken) {
            return res.status(404).json({
                success: false,
                message: 'Invalid Token!'
            });
        }

        req.userId = verifyToken.userId;
        next();
        
    } catch (error) {
        return res.status(500).json({
            message: `isAuth Error: ${error}`
        });
    }
};

export default isAuth;