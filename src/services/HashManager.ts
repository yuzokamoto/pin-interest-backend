import bcrypt from "bcryptjs";

export class HashManager {
  public async hash(password: string): Promise<string> {
    const rounds = Number(process.env.BCRYPT_ROUNDS) || 12;
    const salt = await bcrypt.genSalt(rounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  public async compare(password: string, hash: string): Promise<boolean> {
    const result = bcrypt.compare(password, hash);
    return result;
  }
}
