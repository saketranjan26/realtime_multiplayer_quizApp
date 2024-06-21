import { NextFunction,Request,Response } from "express";
import jwt from "jsonwebtoken";

const authMiddleware = (req:Request,res:Response,next:NextFunction)=>{

    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("bearer ")){
        return res.status(401).json({
            error:"token is missing"
        })
    }

    const jwtSecret = process.env.JWT_SECRET ;
    const token = authHeader.split(' ')[1];
    
    try{
    const decodedData = jwt.sign(token,"jwtSecret")
    next();
    }catch(e){
        return res.status(403).json({
            message:"error while authorizing",
            error:e
        })
    }
}

export default authMiddleware;