import { CRUDService } from "../../base/CRUDService";
import { User, UserModel } from "./user.model";
export class UserService extends CRUDService<User>{
    constructor(){
        super(UserModel);
    } 
}

export const  userService = new UserService();