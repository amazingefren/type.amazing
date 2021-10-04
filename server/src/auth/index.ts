import { User } from "models/user.model";
import * as passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { db } from "../database/knexfile";

passport.serializeUser((id, done) => {
  done(null, id);
});
passport.deserializeUser((id, done) => {
  // User.findById(id, (err: Error, user: typeof User) => done(err, user));
});


















passport.use(
  new LocalStrategy(async (username, password, done) => {
    const user = await db<User>('users').where({username}).select('id', 'username')
    console.log(user)
    return done(null, 'Ok')
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

export default passport;
