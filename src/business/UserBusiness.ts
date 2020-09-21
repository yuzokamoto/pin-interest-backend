import { UserDatabase } from "../database/UserDatabase";
import { User } from "../model/user/User";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";
import { BaseBusiness } from "./BaseBusiness";

export class UserBusiness extends BaseBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private idGenerator: IdGenerator,
    private authenticator: Authenticator
  ) {
    super();
  }

  public async createUser(input: any): Promise<string> {
    this.validateInput(input);

    const { name, username, email, password } = input;
    const id = this.idGenerator.generate();
    const user = new User(id, name, username, email, password);
    await this.userDatabase.createUser(user);

    const token = this.authenticator.generateToken({ id });
    return token;
  }

  public async login(input: any): Promise<string> {
    this.validateInput(input);

    const { email, password } = input;
    const user = await this.userDatabase.getUserByEmail(email);
    if (!user) {
      throw new Error(`Login failed: check username and/or password`);
    }
    if (password !== user.getPassword()) {
      throw new Error(`Login failed: check username and/or password`);
    }

    const tokenData = { id: user.getId() };
    const token = this.authenticator.generateToken(tokenData);
    return token;
  }
}
