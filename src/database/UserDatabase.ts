import { User } from "../model/user/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  private static TABLE_NAME = "PINTEREST_USERS";

  public toModelUser(data: any): User | null {
    if (
      !data ||
      !data.id ||
      !data.name ||
      !data.username ||
      !data.email ||
      !data.password
    ) {
      return null;
    }
    const { id, name, username, email, password } = data;
    return new User(id, name, username, email, password);
  }

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

  public async getUserByEmail(email: string): Promise<User | null> {
    const data = await this.getConnection()
      .select()
      .from(UserDatabase.TABLE_NAME)
      .where({ email })
      .first();
    const user = this.toModelUser(data);
    return user;
  }
}
