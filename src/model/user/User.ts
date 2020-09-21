export class User {
  constructor(
    private id: string,
    private name: string,
    private username: string,
    private email: string,
    private password: string
  ) {}

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getUsername() {
    return this.username;
  }

  getEmail() {
    return this.email;
  }

  getPassword() {
    return this.password;
  }

  setId(newId: string) {
    this.id = newId;
  }

  setName(newName: string) {
    this.name = newName;
  }

  setUsername(newUsername: string) {
    this.username = newUsername;
  }

  setEmail(newEmail: string) {
    this.email = newEmail;
  }

  setPassword(newPassword: string) {
    this.password = newPassword;
  }
}
