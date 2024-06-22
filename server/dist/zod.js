"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.questionInput = exports.signinInput = exports.signupInput = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signupInput = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6),
    username: zod_1.default.string().optional()
});
exports.signinInput = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6)
});
exports.questionInput = zod_1.default.object({
    question: zod_1.default.string(),
    optionA: zod_1.default.string(),
    optionB: zod_1.default.string(),
    optionC: zod_1.default.string(),
    optionD: zod_1.default.string(),
    correctOption: zod_1.default.string(),
    quizId: zod_1.default.string()
});
