import { Router } from "express";
import { PinBusiness } from "../business/PinBusiness";
import { PinController } from "../controller/PinController";
import { PinDatabase } from "../database/PinDatabase";
import { UserDatabase } from "../database/UserDatabase";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export const pinRouter = Router();

const pinController = new PinController(
  new PinBusiness(
    new PinDatabase(),
    new UserDatabase(),
    new IdGenerator(),
    new Authenticator()
  )
);

pinRouter.post("/", pinController.createPin);
pinRouter.get("/", pinController.getAllPins);
