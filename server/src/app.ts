// Module Imports
import * as express from "express";
import * as session from "express-session";
import { db } from "./database/knexfile";
const KnexSessionStore = require("connect-session-knex")(session);

// Local Imports
import router from "./routes";
import auth from "./auth";

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

// Auth Session
const store = new KnexSessionStore({
  knex: db as any,
  tablename: "sessions",
  sidfieldname: "sid",
  createtable: true,
});

const start = async () => {
  await db.test();

  app.use(
    session({
      secret: "session secret",
      cookie: { maxAge: 60000 },
      resave: false,
      saveUninitialized: false,
      store,
    })
  );

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
