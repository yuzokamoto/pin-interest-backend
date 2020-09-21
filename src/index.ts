import express from "express";
import dotenv from "dotenv";
import { AddressInfo } from "net";
import { userRouter } from "./router/userRouter";
import { pinRouter } from "./router/pinRouter";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/user", userRouter);
app.use("/pin", pinRouter);

const server = app.listen(process.env.SERVER_PORT || 3003, () => {
  const address = server.address() as AddressInfo;
  if (server) {
    console.log(`Server is running at https://localhost:${address.port}`);
  } else {
    console.log(`Failure uppon starting server`);
  }
});
