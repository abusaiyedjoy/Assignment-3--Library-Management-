import express, { Application, Request, Response } from "express"
import { router } from "./app/controller/Book.Controller";

const app:Application = express()


app.use(express.json())
app.use('/api/books', router)

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World")
});

export default app;