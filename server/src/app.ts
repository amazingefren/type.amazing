// Lib
import * as express from "express";
import * as mongoose from "mongoose";

// Local Imports
import router from "./routes";

// Util Imports
import getLogger from "./utils/logger";
const logger = getLogger("Server");

// Constants
const app = express();
const port = process.env.PORT || 8000;
const dbUri = process.env.MONGODB_URI || "mongodb://localhost:27017/type";

// Express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

const start = async () => {
  // Mongo
  await mongoose
    .connect(dbUri)
    .then(() => {
      logger.info("Connected To Mongo");
    })
    .catch((err) => {
      logger.error(err);
      process.exit(1);
    });
  mongoose.set("debug", true);

  const server: any = app.listen(port, () => {
    logger.info(
      "Server Started " + server.address().address + server.address().port
    );
  });

  process.on("SIGTERM", () => {
    server.close(() => {
      mongoose.disconnect();
      logger.warn("Exiting");
    });
  });
};

start();
