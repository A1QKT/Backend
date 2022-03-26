import { gql } from "apollo-server-express";
import _ from "lodash";

export default {
    typeDefs: gql`
    type Query{
        getAllNames: [Student]
        getInfo(id: String!): [Student]
    },
    type Student{
        id: String
        name: String
    }
    `,
    resolvers: {
        Query: {
            getAllNames(root: any, args: any, context: any){
                return[
                    {
                        id: 1,
                        name: "khoi"
                    },
                    {
                        id: 2,
                        name: "long"
                    }
                ]
            },
            getInfo(root: any, args: any, context: any){
                return _.reduce([
                    {
                        id: 1,
                        name: "khoi"
                    },
                    {
                        id: 2,
                        name: "long"
                    }
                ], function (res: any, value: any, index: any) {
                    if(value.id ==  args.id){
                        res.push(value);
                    }                    
                    return res;
                },[])
            }
        }
    }
}