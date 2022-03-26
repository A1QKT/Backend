import {Mongo} from './helpers/mongo';
import { Schema } from 'mongoose';
import app , { startServer } from './helpers/express';
import {GraphqlServer} from './helpers/apollo';

// const UserModel = Mongo.model("UserModel", new Schema({
//     name: {type: String, required: true},
//     email: {type: String, required: true},
//     gender: {type: String, enum: ["male", "female"], default: "male"},
//     age: {type: Number, default: 18},
//     password: {type: String, required: true}
// }, {timestamps: true}))

// async function run(){
//     await UserModel.remove({});
//     await UserModel.insertMany([
//         {name: "john", email: "john@gmail.com", password: "john1234"},
//         {name: "Marry", email: "marry@gmail.com", password: "marry1234"}
//     ])

//     const users = await UserModel.find({});
//     console.log(users);
// }

// // run();
startServer();
const graphqlServer = new GraphqlServer(app);
graphqlServer.start();