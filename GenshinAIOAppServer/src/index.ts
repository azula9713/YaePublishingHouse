import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";

import logger from "./utils/Logger";
import dbConnect from "./utils/DbConnect";

import routes from "./routes/routes.index";

const server = express();
server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(compression());

const port = 4000;

server.listen(port, `0.0.0.0`, async () => {
  logger.info(`Server is listening on port at localhost:${port}`);
  // await dbConnect();
  routes(server);
});
