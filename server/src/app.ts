// Module Imports
import * as express from "express";
import * as mongoose from "mongoose";
import * as session from "express-session";
import * as passport from "passport";
import * as dotenv from 'dotenv'
import { Strategy as LocalStrategy } from "passport-local";
dotenv.config()

// Local Imports
import router from "./routes";
import User from "./models/user.model";

// Util Imports
import getLogger from "./utils/logger";
const logger = getLogger("Server");

// Constants
const app = express();
const port = process.env.PORT || 8000;
const dbUri = process.env.MONGO_URI || "mongodb://localhost:27017/type";

// Middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "HELLOWORLD",
    resave: false,
    saveUninitialized: true,
  })
);

// Authentication
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((id, done) => {
  done(null, id);
});
passport.deserializeUser((id, done) => {
  User.findById(id, (err: Error, user: typeof User) => done(err, user));
});
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false, {message: "User Not Found"})

      //Bcrypt Here
      if (password === user.password) {
        return done(null, user)
      }
      return done(null,false,{message:"User Not Found 2!"})
    });
  })
);

// Express
app.use(express.urlencoded({ extended: false }));
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
