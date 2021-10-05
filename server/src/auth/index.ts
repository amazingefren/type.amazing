import { User } from "models/user.model";
import * as passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { db } from "../database/knexfile";
import * as bcrypt from "bcrypt";

passport.serializeUser((user: User, done) => {
  done(null, user.id);
});
passport.deserializeUser((id: number, done) => {
  // User.findById(id, (err: Error, user: typeof User) => done(err, user));
  /* db<User>("users")
    .where({ id: id })
    .select("*")
    .then((user) => done(null, user))
    .catch((err) => done(err, null)); */
  done(null, id);
});

passport.use(
  new LocalStrategy((username, password, done) => {
    // try {
    db<User>("users")
      .where({ username: username })
      .select("id", "username", "password")
      .first()
      .then((user) => {
        if (bcrypt.compareSync(password, user.password)) {
          console.log("success");
          return done(null, user);
        }
        return done({ message: "Invalid Login (password)" }, false);
      })
      .catch((_) => {
        return done({ message: "Invalid Login" }, false);
      });
  })
);

export default passport;
