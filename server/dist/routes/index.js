"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./user"));
const quiz_1 = __importDefault(require("./quiz"));
const question_1 = __importDefault(require("./question"));
const router = express_1.default.Router();
router.use("/user", user_1.default);
router.use("/quiz", quiz_1.default);
router.use("/question", question_1.default);
exports.default = router;
