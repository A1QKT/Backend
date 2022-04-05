import { UserModel } from "./user.model"
import passwordHash from "password-hash"
import { validateEmail } from "../../helpers/function/checkEmail";
import _ from "lodash";

export default {
    Query: { 
        getAllUsers: async (root: any, args: any, context: any) => {
            const {query} = args;
            if(query) {
                return await fetch(query);
            }
            return await UserModel.find({});
        },
        getOneUser: async (root: any, args: any, context: any) => {
            const {id} = args;
            const user = await UserModel.findById(id);
            if(!user){
                throw Error("No User with this ID");
            }
            return user;
        }
    },
    Mutation: {
        createUser: async (root: any, args: any, context: any) => {
            const {data} = args;
            const {username, name, password, phone, email, role} = data;
            if(username < 6){
                throw Error("Username less than 6 chacacter");
            }
            await checkExistingUsername(username);

            if(name.length < 6){
                throw Error("Name less than 6 chacacter");
            }
            if(!validateEmail(email)){
                throw Error("Email invalid");
            } 
            const user = await UserModel.create({
                username: username,
                name: name, 
                phone: phone,
                password: passwordHash.generate(password, {algorithm: "sha256"}),
                email: email,
                role: role
            });
            console.log(user);
            return user;
        }, 
        updateUser: async (root: any, args: any, context: any) => {
            const {id, data} = args;
            const {name, phone, email} = data;
            const user = await UserModel.findById(id);
            if(!user){
                throw Error("There is no user here");
            }
            if(validateEmail(email)){
                throw Error("Email invalid");
            }
            return await UserModel.findByIdAndUpdate(id, {
                $set: data
            }, {new: true, password: 0})
        },
        deleteUser: async(root: any, args: any, context: any) => {
            const {id} = args;
            return await UserModel.findByIdAndDelete(id);
        }
    }
}
async function checkExistingUsername(username: String){
    const user = await UserModel.findOne({username})
    if(user){
        throw Error("Already have username")
    }
    return user
}

type QueryInput = {
    limit?: number;
    page?: number;
    order?: any;
    filter?: any;
    search?: string;
}

async function fetch(queryInput: QueryInput, select?: string) {
    const limit = queryInput.limit || 10;
    const skip = ((queryInput.page || 1) - 1) * limit || 0;
    const order = queryInput.order;
    // const search = queryInput.search;
    const query = UserModel.find();

    // if (search) {
    //   if (search.includes(" ")) {
    //     set(queryInput, "filter.$text.$search", search);
    //     query.select({ _score: { $meta: "textScore" } });
    //     query.sort({ _score: { $meta: "textScore" } });
    //   } else {
    //     const textSearchIndex = this.model.schema
    //       .indexes()
    //       .filter((c: any) => values(c[0]!).some((d: any) => d == "text"));
    //     if (textSearchIndex.length > 0) {
    //       const or: any[] = [];
    //       textSearchIndex.forEach((index) => {
    //         Object.keys(index[0]!).forEach((key) => {
    //           or.push({ [key]: { $regex: search, $options: "i" } });
    //         });
    //       });
    //       set(queryInput, "filter.$or", or);
    //     }
    //   }
    // }

    if (order) {
      query.sort(order);
    }
    if (queryInput.filter) {
      const filter = JSON.parse(
        JSON.stringify(queryInput.filter).replace(/\"(\_\_)(\w+)\"\:/g, `"$$$2":`)
      );
      query.setQuery({ ...filter });
    }
    const countQuery = UserModel.find().merge(query);
    query.limit(limit);
    query.skip(skip);
    // console.time("Fetch");
    // console.time("Count");
    if (select) {
      query.select(select);
    }
    return await Promise.all([
      query.exec().then((res) => {
        // console.timeEnd("Fetch");
        return res;
      }),
      countQuery.count().then((res) => {
        // console.timeEnd("Count");
        return res;
      }),
    ]).then((res) => {
      return {
        data: res[0],
        pagination: {
          page: queryInput.page || 1,
          limit: limit,
          total: res[1],
        },
      };
    });
  }