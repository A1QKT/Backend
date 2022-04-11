import { gql } from "apollo-server-express";
import firebase from "../../../helpers/firebase";
import { UserModel, userRole } from "../user.model";
import Token from "../../../helpers/token";

export default {
    typeDefs: gql`
        extend type Mutation{
            loginByFireBase(accessToken: String!): LogedInUser
        }
        type LogedInUser{
            user: User
            token: String
        }
    `,
    resolvers: {
        Mutation: {
            loginByFireBase: async (root: any, args: any, context: any) => { 
                const {accessToken}  = args;
                const decodedToken = await firebase.auth().verifyIdToken(accessToken);
                let user = await UserModel.findOne({uid: decodedToken.uid});
                if(!user) {
                    const provider = decodedToken.firebase.sign_in_provider
                    switch (decodedToken.firebase.sign_in_provider){
                    case "emai":
                        user = await UserModel.create({
                            uid: decodedToken.uid,
                            username: decodedToken.email,
                            name: decodedToken.email,
                            phone: "",
                            password: null,
                            email: decodedToken.email,
                            role: userRole.USER,
                        });
                        break;
                    case "google.com":
                        user  = await UserModel.create({
                            uid: decodedToken.uid, 
                            username: decodedToken.email,
                            name: decodedToken.name,
                            phone: "",
                            email: decodedToken.email,
                            password: null,
                            role: userRole.USER,
                        })
                        break;
                    default:
                        user = await UserModel.create({
                            uid: decodedToken.uid,
                            username: decodedToken.phone_number,
                            name: decodedToken.phone_number,
                            phone: decodedToken.phone_number,
                            password: null,
                            email: "",
                            role: userRole.USER
                        });
                        break;
                    }
                }
                const token = new Token(user._id, user.role as any);
                return {
                    user: user,
                    token: token.sign
                }
            }
        }
    }
}