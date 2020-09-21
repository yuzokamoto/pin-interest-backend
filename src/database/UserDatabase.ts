import { User } from "../model/user/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  private static TABLE_NAME = "PINTEREST_USERS";

  public async createUser(user: User): Promise<void> {
    await this.getConnection()
      .insert({
        id: user.getId(),
        name: user.getName(),
        username: user.getUsername(),
        email: user.getEmail(),
        password: user.getPassword(),
      })
      .into(UserDatabase.TABLE_NAME);
  }
}
