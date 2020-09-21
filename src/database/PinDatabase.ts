import { Pin } from "../model/pin/Pin";
import { BaseDatabase } from "./BaseDatabase";

export class PinDatabase extends BaseDatabase {
  private static TABLE_NAME = "PINTEREST_PINS";

  public toModelPin(data: any): Pin {
    const { id, author, title, subtitle, date, file, tags } = data;
    return new Pin(id, author, title, subtitle, date, file, tags);
  }

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

  public async getAllPins(): Promise<Pin[]> {
    const dataArray = await this.getConnection()
      .select()
      .from(PinDatabase.TABLE_NAME);

    const pins = [];
    for (let data of dataArray) {
      const pin = this.toModelPin(data);
      pins.push(pin);
    }
    return pins;
  }
}
