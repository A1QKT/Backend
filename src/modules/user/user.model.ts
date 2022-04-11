import {Schema} from "mongoose";
import { Basemodel } from "../../base/baseModel";
import { Mongo } from "../../helpers/mongo";

export enum userRole{
    "ADMIN",
    "USER"
}

export type User = Basemodel & { 
    uid?: string,
    username?: string,
    name?: string, 
    phone?: string,
    password?: string,
    email?: string,
    role?: userRole,
    scope?: [string]
}

const userSchema = new Schema({
    uid: {type: String},
    username: {type: String, required: true},  
    name: {type: String, required :true},
    phone: {type: String},
    password: {type: String},
    email: {type: String, required: true},
    role: {type: String, required: true, enum: Object.values(userRole)},
    scope: {type: [String]}
}, {timestamps: true})

userSchema.index({username : 1}, {unique: true});

export const UserModel = Mongo.model<User>("User", userSchema);