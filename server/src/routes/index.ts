import  express  from 'express';
import userRouter from "./user";
import quizRouter from "./quiz"
import questionRouter from "./question"

const router = express.Router();

router.use("/user",userRouter)
router.use("/quiz",quizRouter)
router.use("/question",questionRouter)

export default router;

