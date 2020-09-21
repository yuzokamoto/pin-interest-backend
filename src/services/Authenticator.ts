import jwt from "jsonwebtoken";
import { TokenData } from "../model/user/tokenData";

export class Authenticator {
  public generateToken(data: TokenData) {
    return jwt.sign(data, process.env.JWT_KEY as string);
  }
}
