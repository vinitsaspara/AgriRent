import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js"; // import User model

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: Token missing", success: false });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized: Invalid token", success: false });
    }

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    req.user = user; // ✅ Attach full user info
    req.id = decoded.userId;

    next();
  } catch (error) {
    console.log("AUTH_MIDDLEWARE :: ", error);
    return res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

export default authMiddleware;
