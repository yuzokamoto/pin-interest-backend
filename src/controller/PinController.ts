import { Request, Response } from "express";
import { PinBusiness } from "../business/PinBusiness";
import { BaseDatabase } from "../database/BaseDatabase";

export class PinController {
  constructor(private pinBusiness: PinBusiness) {}

  public createPin = async (req: Request, res: Response): Promise<void> => {
    try {
      const input = req.body;
      const [bearer, token] = (req.headers.authorization as string).split(" ");
      await this.pinBusiness.createPin(input, token);
      res.status(200).send({ message: `Pin created successfully` });
    } catch (error) {
      res.status(400).send({ message: error.message });
    } finally {
      await BaseDatabase.destroyConnection();
    }
  };

  public getPin = async (req: Request, res: Response): Promise<void> => {
    try {
      const [bearer, token] = (req.headers.authorization as string).split(" ");
      const pinId = req.params.id;
      const result = await this.pinBusiness.getPin(token, pinId);
      res.status(200).send({ message: `Got all pins successfully`, result });
    } catch (error) {
      res.status(400).send({ message: error.message });
    } finally {
      await BaseDatabase.destroyConnection();
    }
  };
}
