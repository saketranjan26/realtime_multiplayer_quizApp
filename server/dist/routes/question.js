"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = __importDefault(require("../middleware"));
const zod_1 = require("../zod");
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
router.post("/", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success } = zod_1.questionInput.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "invalid inputs"
        });
    }
    try {
        const question = yield prisma.question.create({
            data: {
                question: req.body.question,
                optionA: req.body.optionA,
                optionB: req.body.optionB,
                optionC: req.body.optionC,
                optionD: req.body.optionD,
                correctAnswer: req.body.correctAnswer,
                quizId: req.body.quizId
            }
        });
        return res.json({
            msg: "question created",
            questionId: question.id
        });
    }
    catch (error) {
        return res.status(403).json({
            mesg: "error while creating question",
            err: error
        });
    }
}));
router.put("/", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success } = zod_1.questionInput.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "invalid inputs"
        });
    }
    try {
        const question = yield prisma.question.update({
            where: {
                id: req.body.questionId
            },
            data: {
                question: req.body.question,
                optionA: req.body.optionA,
                optionB: req.body.optionB,
                optionC: req.body.optionC,
                optionD: req.body.optionD,
                correctAnswer: req.body.correctAnswer,
                quizId: req.body.quizId
            }
        });
        return res.json({
            msg: "question created",
            questionId: question.id
        });
    }
    catch (error) {
        return res.status(403).json({
            mesg: "error while creating question",
            err: error
        });
    }
}));
router.get('/bluk', middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { quizId } = req.query;
    if (!quizId) {
        return res.status(400).json({ error: "quizId is required" });
    }
    try {
        const questions = yield prisma.question.findMany({
            where: {
                quizId: String(quizId)
            }
        });
        return res.json({
            questions
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: "error while fething questions",
            err: error
        });
    }
}));
router.delete("/", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const quesToBeDeleted = req.body.questionId;
    if (!quesToBeDeleted) {
        return res.status(400).json({ msg: "questionId is required" });
    }
    try {
        const deleting = yield prisma.question.delete({
            where: {
                id: quesToBeDeleted
            }
        });
        return res.json({
            msg: "question deleted successfully"
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: "error while deleting question",
            err: error
        });
    }
}));
exports.default = router;
