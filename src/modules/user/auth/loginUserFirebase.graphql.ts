// import {gql} from "apollo-server-express"
// import firebase from "../../../helpers/firebase"
// import { UserModel } from "../user.model";

// export default {
//     schema: gql`
//     type Mutation{
//         loginByFirebase(token: String!): LoginUserData
//     }
//     type LoginUserData{
//         user: User
//         token: String
//     }
//     `,
//     resolvers: {
//         loginByFirebase: async (root: any, args: any, context: any) => {
//             const {token} = args;
//             const decodeToken = await firebase.auth().verifyIdToken(token);
//             const user = UserModel.findOne({uid: decodeToken.uid});

//             return {
//                 user: user,
//                 token: token
//             }
//         }
//     }
// }