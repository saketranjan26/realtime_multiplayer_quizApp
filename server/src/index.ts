import  express  from "express";
import rootRouter from "./routes/index";
import cors from 'cors'
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cors())
app.use(express.json())
app.use("/api/v1",rootRouter)

const PORT = process.env.PORT ;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
