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
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
router.post("/", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const quiz = yield prisma.quiz.create({
            data: {
                name: req.body.name,
                authorId: req.body.authorId
            }
        });
        return res.json({
            msg: "quiz created successfully",
            quizId: quiz.id
        });
    }
    catch (error) {
        return res.status(502).json({
            msg: "error while creating quiz",
            err: error
        });
    }
}));
router.get("/bulk", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const quizes = yield prisma.quiz.findMany();
        return res.json({
            quizes
        });
    }
    catch (error) {
        return res.status(502).json({
            msg: "error while fetching quiz",
            err: error
        });
    }
}));
router.get("/", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorId } = req.query;
    try {
        const quizes = yield prisma.quiz.findMany({
            where: {
                authorId: String(authorId)
            }
        });
        return res.json({
            quizes
        });
    }
    catch (error) {
        return res.status(502).json({
            msg: "error while fetching quiz",
            err: error
        });
    }
}));
router.delete("/", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const quiz = yield prisma.quiz.delete({
            where: {
                id: req.body.quizId
            }
        });
        return res.json({
            msg: "quiz deleted successfully"
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: "error while deleting quiz",
            err: error
        });
    }
}));
exports.default = router;
