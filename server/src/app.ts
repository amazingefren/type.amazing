// Module Imports
import * as express from "express";
import { db } from './database/knexfile'

// Local Imports
import router from "./routes";
import auth from "./auth"

// Util Imports
import getLogger from "./utils/logger";
const logger = getLogger("Server");

// Constants
const app = express();
const port = process.env.PORT || 8000;

// Middleware

// Authentication
app.use(auth.initialize());
// app.use(passport.session());

// Express
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);

const start = async () => {
  await db.test()

  const server: any = app.listen(port, () => {
    logger.info(
      "Server Started " + server.address().address + server.address().port
    );
  });

  process.on("SIGTERM", () => {
    server.close(() => {
      logger.warn("Exiting");
    });
  });
};

start();
