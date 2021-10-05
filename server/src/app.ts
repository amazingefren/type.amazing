// Module Imports
import * as express from "express";
// import * as passport from "passport";
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

// Auth Session
const store = new KnexSessionStore({
  knex: db as any,
  tablename: "sessions",
  sidfieldname: "sid",
  createtable: true,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "bob",
    cookie: { maxAge: 86400000 },
    resave: false,
    rolling: true,
    saveUninitialized: false,
    store: store,
  })
);
// Authentication
app.use(auth.initialize());
app.use(auth.session());

const start = async () => {
  await db.test();
  app.use(router);

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
