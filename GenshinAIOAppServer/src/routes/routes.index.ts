import { Express } from "express";

import characterRoutes from "./enkaCharacterRoutes";
import enkaProfileRoutes from "./enkaProfileRoutes";

const routes = (server: Express): void => {
  server.use("/api/v1/enkaCharacters", characterRoutes);
  server.use("/api/v1/enkaProfile", enkaProfileRoutes);
};

export default routes;
