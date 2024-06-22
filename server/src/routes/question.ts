import { Request,Response } from "express";
import express from "express";
import authMiddleware from "../middleware";
import { questionInput } from "../zod";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/", authMiddleware, async (req:Request,res:Response) => {
    const {success} = questionInput.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message:"invalid inputs"
        })
    }

    try{
        const question = await  prisma.question.create({
            data:{
                question: req.body.question,
                optionA: req.body.optionA,
                optionB: req.body.optionB,
                optionC: req.body.optionC,
                optionD: req.body.optionD,
                correctOption: req.body.correctOption,
                quizId: req.body.quizId
            }
        })
        return res.json({
            msg:"question created",
            questionId: question.id
        })
    }catch(error){
        return res.status(403).json({
            msg:"error while creating question",
            err: error
        })

    }
})

router.put("/", authMiddleware, async (req:Request,res:Response)=>{
    const {success} = questionInput.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message:"invalid inputs"
        })
    }

    try{
        const question = await  prisma.question.update({
            where:{
                id: req.body.questionId
            },
            data:{
                question: req.body.question,
                optionA: req.body.optionA,
                optionB: req.body.optionB,
                optionC: req.body.optionC,
                optionD: req.body.optionD,
                correctOption: req.body.correctOption,
                quizId: req.body.quizId
            }
        })
        return res.json({
            msg:"question updated",
            questionId: question.id
        })
    }catch(error){
        return res.status(403).json({
            mesg:"error while updating question",
            err: error
        })
    }
})

router.get('/bulk', authMiddleware, async (req:Request,res:Response)=>{

    const {quizId} = req.query;
    if (!quizId) {
        return res.status(400).json({ error: "quizId is required" });
    }
    
    try{
        const questions = await prisma.question.findMany({
            where:{
                quizId:String(quizId)
            }
        })
        return res.json({
            questions
        })
    }catch(error){
        return res.status(500).json({
            msg:"error while fething questions",
            err: error
        })
    }
})

router.delete("/", authMiddleware, async (req:Request,res:Response)=>{
    const quesToBeDeleted = req.body.questionId;

    if (!quesToBeDeleted) {
        return res.status(400).json({ msg: "questionId is required" });
    }
    try{
        const deleting = await prisma.question.delete({
            where:{
                id:quesToBeDeleted

            }
        })
        return res.json({
            msg:"question deleted successfully"
        })
    }catch(error){
        return res.status(500).json({
            msg:"error while deleting question",
            err: error
        })
    }
})


export default router


