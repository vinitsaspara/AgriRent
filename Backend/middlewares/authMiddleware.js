import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    // Corrected cookies access
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: Token missing", success: false });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    if (!decode) {
      return res.status(401).json({ message: "Unauthorized: Token invalid", success: false });
    }

    req.id = decode.userId;
    next();
  } catch (error) {
    console.log("AUTH_MIDDLEWARE :: ", error);
    return res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

export default authMiddleware;
