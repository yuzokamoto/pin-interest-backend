import { PinDatabase } from "../database/PinDatabase";
import { UserDatabase } from "../database/UserDatabase";
import { Pin } from "../model/pin/Pin";
import { Authenticator } from "../services/Authenticator";
import { BaseBusiness } from "./BaseBusiness";
import { performance } from "perf_hooks";
import { IdGenerator } from "../services/IdGenerator";

export class PinBusiness extends BaseBusiness {
  constructor(
    private pinDatabase: PinDatabase,
    private userDatabase: UserDatabase,
    private idGenerator: IdGenerator,
    private authenticator: Authenticator
  ) {
    super();
  }

  public async createPin(input: any, token: string): Promise<void> {
    if (typeof token !== "string") {
      throw new Error(`Access denied: invalid token`);
    }

    const tokenData = this.authenticator.getTokenData(token);
    if (typeof tokenData !== "object" || !("id" in tokenData)) {
      throw new Error(`Access denied: invalid token`);
    }

    const user = await this.userDatabase.getUserById((tokenData as any).id);
    if (!user) {
      throw new Error(`Access denied: invalid token`);
    }

    const { title, subtitle, file, tags } = input;
    this.validateInput({ title, subtitle, file, tags });

    const id = this.idGenerator.pinId();
    const date = new Date();
    const author = user.getId();

    const pin = new Pin(id, author, title, subtitle, date, file, tags);
    await this.pinDatabase.createPin(pin);
  }

  public async getPin(token: string, pinId: string): Promise<Pin | Pin[] | []> {
    if (typeof token !== "string") {
      throw new Error(`Access denied: invalid token`);
    }

    const tokenData = this.authenticator.getTokenData(token);
    if (typeof tokenData !== "object" || !("id" in tokenData)) {
      throw new Error(`Access denied: invalid token`);
    }

    const user = await this.userDatabase.getUserById((tokenData as any).id);
    if (!user) {
      throw new Error(`Access denied: invalid token`);
    }

    if (!pinId) {
      return this.pinDatabase.getAllPins();
    }

    return this.pinDatabase.getPinById(pinId);
  }
}
