import jwt from "jsonwebtoken";
import { userRole } from "../../modules/user/user.model";
import Token from "../token";

export default test("print web token", () => {
    const payload = {
        name: "khoi",
        age: "20"
    }
    const token = new Token("1234", userRole.ADMIN as any, {});
    console.log(Token.decode(token.sign));
})