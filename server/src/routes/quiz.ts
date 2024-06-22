import express from "express";
import authMiddleware from "../middleware";
import { Response,Request } from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router()
const prisma = new PrismaClient();

router.post("/",authMiddleware, async (req:Request,res:Response)=>{
    
    try{
        const quiz = await prisma.quiz.create({
            data:{
                name:req.body.name,
                authorId: req.body.authorId

            }
        })
        return res.json({
            msg:"quiz created successfully",
            quizId: quiz.id
        })
    }catch(error){
        return res.status(502).json({
            msg:"error while creating quiz",
            err:error
        })
    }
})

router.get("/bulk",authMiddleware, async(req:Request,res:Response)=>{

    try{
        const quizes = await prisma.quiz.findMany();
        return res.json({
            quizes
        })
    }catch(error){
        return res.status(502).json({
            msg:"error while fetching quiz",
            err:error
        })
    }
})

router.get("/",authMiddleware,async(req:Request,res:Response)=>{
    const {authorId} = req.query;
    
    try{
        const quizes = await prisma.quiz.findMany({
            where:{
                authorId:String(authorId)
            }
        })
        return res.json({
            quizes
        })
    }catch(error){
        return res.status(502).json({
            msg:"error while fetching quiz",
            err:error
        })
    }
})

router.delete("/", authMiddleware, async(req:Request,res:Response)=>{
    
    try{
        const quiz = await prisma.quiz.delete({
            where:{
                id:req.body.quizId
            }
        })
        return res.json({
            msg:"quiz deleted successfully"
        })
    }catch(error){
        return res.status(500).json({
            msg:"error while deleting quiz",
            err: error
        })
    }
})

export default router