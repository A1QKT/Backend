import { UserModel } from "./user.model"
import passwordHash from "password-hash"
import { validateEmail } from "../../helpers/function/checkEmail";
import _ from "lodash";
import { Context } from "../../helpers/graphql/context";
import { userRole } from "./user.model";
import { userService } from "./user.service";

export default {
    Query: { 
        getAllUsers: async (root: any, args: any, context: Context) => {
            if(!context.isAuthent) throw Error("unauthent");
            if(context.token?.role != (userRole.ADMIN as any)) throw Error("permission denied");
            const {query} = args;
              if(query) {
                  return await userService.fetch(query);
              }
              return await UserModel.find({});
        },
        getOneUser: async (root: any, args: any, context: Context) => {
            const {id} = args;
            const user = userService.findbyID(id);
            return user;
        }
    },
    Mutation: {
        createUser: async (root: any, args: any, context: Context) => {
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
            const user = await userService.create({
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
        updateUser: async (root: any, args: any, context: Context) => {
            const {id, data} = args;
            const {name, phone, email} = data;
            const user = await UserModel.findById(id);
            if(!user){
                throw Error("There is no user here");
            }
            if(validateEmail(email)){
                throw Error("Email invalid");
            }
            return await userService.update(id, data);
        },
        deleteUser: async(root: any, args: any, context: any) => {
            const {id} = args;
            return await userService.delete(id);
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
