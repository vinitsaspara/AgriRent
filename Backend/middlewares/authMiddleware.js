import jwt from "jsonwebtoken"

const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookie.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized", success: false });
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        if (!decode) {
            return res.status(401).json({ message: "Unauthorized", success: false });
        }

        req.id = decode.userId;
        next();

    } catch (error) {
        console.log("AUTH_MIDDLEWARE :: ", error);
    }
}

export default authMiddleware;

