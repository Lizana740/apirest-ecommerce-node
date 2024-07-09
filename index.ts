import express from "express";
import container from "./config/container";
import { MongoDB } from "./config/mongo.db";
import routerApi from "./core/router"

const PORT = process.env.SERVER_PORT;

const dataBaseMongo = container.get<MongoDB>(MongoDB);

dataBaseMongo.connect().then(() => {
  const app = express();

  app.use(express.json());
  app.use("/api", routerApi);

  app.listen(PORT, () => {
    console.log("Listen in PORT =>", PORT);
  });
});
