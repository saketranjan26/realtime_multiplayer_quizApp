"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("bearer ")) {
        return res.status(401).json({
            error: "token is missing"
        });
    }
    const jwtSecret = process.env.JWT_SECRET;
    const token = authHeader.split(' ')[1];
    try {
        const decodedData = jsonwebtoken_1.default.verify(token, "jwtSecret");
        next();
    }
    catch (e) {
        return res.status(403).json({
            message: "error while authorizing",
            error: e
        });
    }
};
exports.default = authMiddleware;
