import express, { Application, Request, Response } from "express"
import { router } from "./app/controller/Book.Controller";
import { borrowRouter } from "./app/controller/Borrow.Controller";
import cors from 'cors'
const app:Application = express()

app.use(cors({
    origin: ['https://library-management-client.netlify.app'],
}))

app.use(express.json())
app.use('/api/books', router)
app.use('/api/borrow', borrowRouter)

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World")
});

export default app;