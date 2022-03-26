import {ApolloServer, gql} from "apollo-server-express";
import {Application, Request} from "express";
import {loadGraphqlSchema, loadGraphqlResolver, loadGraphql} from "./autoloader";
import graphqlTypeDate from "graphql-type-datetime";
import _ from "lodash";
import minifyGraphql from "minify-graphql-loader";
import logger from "./logger";
import morgan from "morgan";

export class GraphqlServer{
    constructor(public app: Application){}
    async start(){
        let typeDefs = [
            gql`
            scalar Datetime
            type Query{
                _empty: String
            }
            type Mutation{
                _empty: String
            }
            type Subscription{
                _empty: String
            }
            `,
        ]

        let resolvers: any = {
            Query: {
                _empty: () => "empty"
            },
            Datetime: graphqlTypeDate
        }       

        const loadSchema = await loadGraphqlSchema();
        typeDefs = typeDefs.concat(loadSchema);

        const loadResolver = await loadGraphqlResolver();
        resolvers = _.merge(resolvers, loadResolver);

        const loadSchemaResolver: any = await loadGraphql();
        typeDefs = typeDefs.concat(loadSchemaResolver.typeDefs);
        resolvers = _.merge(resolvers, loadSchemaResolver.resolvers);
        
        const server = new ApolloServer({
            typeDefs: typeDefs,
            resolvers: resolvers,
        });
        
        morgan.token("gql-query", (req: Request) => req.body.query)
        this.app.use("/graphql", (req, res, next) => {
            if(req.body?.query){
                let minify = minifyGraphql(req.body.query);
                req.body.query = minify;
            }
            next();
        }, morgan("GRAPHQL :gql-query - :status :response-time ms", {
            skip: (req) => _.get(req, "body.query", "").includes("IntrospectionQuery"),
            stream: {
                write: (msg: string) => logger.info(msg)
            }
        }))
        await server.start();
        server.applyMiddleware({app: this.app});
    }
}