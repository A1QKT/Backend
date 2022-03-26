import { Autoloader } from "autoloader-ts";
import _ from "lodash";

export async function loadGraphqlSchema(){
    const loader = await Autoloader.dynamicImport();
    await loader.fromGlob(__dirname + "/../modules/**/*.schema.ts");
    const exports = loader.getResult().exports;
    return exports;
}

export async function loadGraphqlResolver(){
    const loader = await Autoloader.dynamicImport();
    await loader.fromGlob(__dirname + "/../modules/**/*.resolver.ts");
    exports = loader.getResult().exports;
    return _.reduce(exports, (pre, value) => {
       return _.merge(pre, value); 
    } ,{});
}

export async function loadGraphql(){
    const loader = await Autoloader.dynamicImport();
    await loader.fromGlob(__dirname + "/../modules/**/*.graphql.ts");
    const exports = loader.getResult().exports;
    return _.reduce(exports, (res: any, val: any, index: any) => {
        res["typeDefs"].push(val.typeDefs);
        _.merge(res.resolvers, val.resolvers);
        return res;
    }, { typeDefs: [], resolvers: {}});
}