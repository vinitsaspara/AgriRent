import { User } from "../models/user.model.js";

const adminMiddleware = (req,res,next)=>{
    
    if(!req.user || req.user.role != "Admin"){
        return res.status(403).json({ message: 'Access denied: Admins only' });
    }
    next();
}

export default adminMiddleware;