import {Application, Router} from "express";
import { loadRouter } from "./autoloader";
import logger from "./logger";

export class APIRouter{
    router = Router();
    constructor(private app: Application){}
    async start(path = "/api"){
        const config = await loadRouter();
        for(const {method, endPoint, handler} of config ){
            this.router[method as "get"](endPoint, handler);
        }
        this.app.use(path, this.router);
        logger.info(`API router started at ${path}`)
    }
}