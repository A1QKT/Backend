import {Document} from "mongoose";

export type Basemodel = Document & {
    createdAt?:Date,
    updateAt?: Date
}