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