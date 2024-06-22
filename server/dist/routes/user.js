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
const zod_1 = require("../zod");
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_1 = __importDefault(require("express"));
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success } = zod_1.signupInput.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "invalid inputs",
        });
    }
    const userExists = yield prisma.user.findFirst({
        where: {
            email: req.body.email,
        },
    });
    if (userExists) {
        return res.status(411).json({
            message: "user already exits please signin",
        });
    }
    const hashedPassword = yield bcrypt_1.default.hash(req.body.password, 10);
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        return res.status(500).json({
            message: "Internal server error: JWT_SECRET is not defined",
        });
    }
    try {
        const user = yield prisma.user.create({
            data: {
                email: req.body.email,
                password: hashedPassword,
            },
        });
        const jwtToken = jsonwebtoken_1.default.sign({ id: user.id }, jwtSecret);
        return res.json({
            msg: "user created successfully",
            token: jwtToken,
        });
    }
    catch (_a) {
        return res.status(403).json({
            msg: "error while signing up",
        });
    }
}));
router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success } = zod_1.signinInput.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "enter valid inputs",
        });
    }
    const user = yield prisma.user.findFirst({
        where: {
            email: req.body.email,
        },
    });
    if (!user) {
        return res.json({
            msg: "user do not exits",
        });
    }
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        return res.status(500).json({
            message: "Internal server error: JWT_SECRET is not defined",
        });
    }
    try {
        const passwordVerification = yield bcrypt_1.default.compare(req.body.password, user.password);
        if (passwordVerification) {
            const jwtToken = jsonwebtoken_1.default.sign({ id: user.id }, jwtSecret);
            return res.json({
                msg: "login successful",
                token: jwtToken,
            });
        }
        else {
            return res.status(411).json({
                error: "enter correct password",
            });
        }
    }
    catch (e) {
        return res.status(403).json({
            msg: "error while signing in",
            error: e,
        });
    }
}));
exports.default = router;
