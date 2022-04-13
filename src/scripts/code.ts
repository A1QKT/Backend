//     Query: {
//         getOneUser(root, args, context){
//             if(!context.isAuthored){
//                 throw Error("Athentication invalid");
//             }
            
//             console.log("root", root);
//             console.log("context", context);
//             context.step = 1;
//             return {
//                 name: args.id,
//                 age: 20
//             };
//         }
//     },
//     Mutation:{
//         setUser(root, args, context){
//             return `hello ${args.id}`;
//         },
//         login(root, args, context) {
//             const {username, password} = args;
//             if(username != "admin") {
//                 throw Error("username invalid");
//             }
//             else if(password != "admin"){
//                 throw Error("password invalid");
//             }
//             const token = jwt.sign({id: 1, name: "khoi"}, config.get("secret"));
//             console.log(token);
//             return{
//                 user:{
//                     name: "khoi",
//                     age: 20
//                 }, 
//                 token: token
//             }
//         }
//     },
//     User: {
//         age: (root, args, context) => {
//             console.log("root", root);
//             console.log("age context", context);
//             return 18;// root.age
//         }
//     }


// context
// context: ({req}) => {
//                 const context: any = {
//                     isAuthored: false,
//                 }
//                 const token = req.headers["x-token"];
//                 if(token){
//                     try{
//                         const payload = jwt.verify(token as string, config.get("secret"));
//                         context.payload = payload;
//                         context.isAuthored = true;
//                     }
//                     catch (err){ 
//                         context.isAuthored = false;
//                     }
//                 }
//                 return context;
//             }
// flag: {
//        __name: "FLAG",
//        __format: "boolean"
//     },
//     number: {
//         __name: "NUMBER",
//         __format: "number"
//     },
//     array:{
//         __name: "ARRAY",
//         __format: "json"
//     },
//     object: {
//         __name: "OBJECT",
//         __format: "json"
//     }

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


//function fetch
// type QueryInput = {
//     limit?: number;
//     page?: number;
//     order?: any;
//     filter?: any;
//     search?: string;
// }

// async function fetch(queryInput: QueryInput, select?: string) {
//     const limit = queryInput.limit || 10;
//     const skip = ((queryInput.page || 1) - 1) * limit || 0;
//     const order = queryInput.order;
//     // const search = queryInput.search;
//     const query = UserModel.find();

//     // if (search) {
//     //   if (search.includes(" ")) {
//     //     set(queryInput, "filter.$text.$search", search);
//     //     query.select({ _score: { $meta: "textScore" } });
//     //     query.sort({ _score: { $meta: "textScore" } });
//     //   } else {
//     //     const textSearchIndex = this.model.schema
//     //       .indexes()
//     //       .filter((c: any) => values(c[0]!).some((d: any) => d == "text"));
//     //     if (textSearchIndex.length > 0) {
//     //       const or: any[] = [];
//     //       textSearchIndex.forEach((index) => {
//     //         Object.keys(index[0]!).forEach((key) => {
//     //           or.push({ [key]: { $regex: search, $options: "i" } });
//     //         });
//     //       });
//     //       set(queryInput, "filter.$or", or);
//     //     }
//     //   }
//     // }

//     if (order) {
//       query.sort(order);
//     }
//     if (queryInput.filter) {
//       const filter = JSON.parse(
//         JSON.stringify(queryInput.filter).replace(/\"(\_\_)(\w+)\"\:/g, `"$$$2":`)
//       );
//       query.setQuery({ ...filter });
//     }
//     const countQuery = UserModel.find().merge(query);
//     query.limit(limit);
//     query.skip(skip);
//     // console.time("Fetch");
//     // console.time("Count");
//     if (select) {
//       query.select(select);
//     }
//     return await Promise.all([
//       query.exec().then((res) => {
//         // console.timeEnd("Fetch");
//         return res;
//       }),
//       countQuery.count().then((res) => {
//         // console.timeEnd("Count");
//         return res;
//       }),
//     ]).then((res) => {
//       return {
//         data: res[0],
//         pagination: {
//           page: queryInput.page || 1,
//           limit: limit,
//           total: res[1],
//         },
//       };
//     });
//   }