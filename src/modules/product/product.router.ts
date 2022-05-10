import { Request, Response } from "express";
import { RouterConfig } from "../../helpers/autoloader";
import { ExcelUploader } from "../../helpers/multer";

export default [{
        method: "get", 
        endPoint: "/product", 
        middleware: [],
        handler: async (req: Request, res: Response) => {
            res.send("Hello em yeu");
        }
    },
    {
        method: "post",
        endPoint: "/product/postFileExcel",
        middleware: [ExcelUploader.single("file")],
        handler: async (req: Request, res: Response) => {
            res.send("some thing");
        }
    }
] as RouterConfig[];