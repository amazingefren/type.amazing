import * as passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

passport.serializeUser((id, done) => {
  done(null, id);
});
passport.deserializeUser((id, done) => {
  // User.findById(id, (err: Error, user: typeof User) => done(err, user));
});
passport.use(
  new LocalStrategy((username, password, done) => {
    // User.findOne({ username: username }, (err, user) => {
      // if (err) return done(err);
      // if (!user) return done(null, false, {message: "User Not Found"})

      //Bcrypt Here
      // if (password === user.password) {
        // return done(null, user)
      // }
      // return done(null,false,{message:"User Not Found 2!"})
    // });
  })
);

export default passport
