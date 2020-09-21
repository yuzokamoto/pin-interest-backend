import { Pin } from "../model/pin/Pin";
import { BaseDatabase } from "./BaseDatabase";

export class PinDatabase extends BaseDatabase {
  private static TABLE_NAME = "PINTEREST_PINS";

  public async createPin(pin: Pin): Promise<void> {
    await this.getConnection()
      .insert({
        id: pin.getId(),
        author: pin.getAuthor(),
        title: pin.getTitle(),
        subtitle: pin.getSubtitle(),
        date: pin.getDate(),
        file: pin.getFile(),
        tags: JSON.stringify(pin.getTags()),
      })
      .into(PinDatabase.TABLE_NAME);
  }
}
