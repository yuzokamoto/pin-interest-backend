import jwt from "jsonwebtoken";
import { TokenData } from "../model/user/TokenData";

export class Authenticator {
  public generateToken(data: TokenData): string {
    return jwt.sign(data, process.env.JWT_KEY as string);
  }

  public getTokenData(token: string): string | object {
    return jwt.verify(token, process.env.JWT_KEY as string);
  }
}
