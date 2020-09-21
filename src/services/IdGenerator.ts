import { v4 } from "uuid";

export class IdGenerator {
  public userId() {
    return v4();
  }

  public pinId() {
    // timestamp in microseconds rounded to nearest integer
    const hrTime = process.hrtime();
    return Math.round(hrTime[0] * 1000000 + hrTime[1] / 1000);
  }
}
