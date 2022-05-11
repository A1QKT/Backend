import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import morgan from "morgan";

const app = express();

export function startServer(){
    app.use(json());
    app.use(cors());
    app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
    app.get("/", (req, res) => {
        res.send("hello em")
    });
    app.get("/get", (req, res) => {
        res.send("ok em");
    });
    app.listen(5555, () => {
        console.log("start express on http://localhost:5555");    
    });
}
export default app;