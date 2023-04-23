import passport from "passport";
import { sigInStrategy, signUpStrategy } from "./local";
import { googleStrategy } from "./google";

//  create local Strategy sign in
passport.use("signin", sigInStrategy);
passport.use("signup", signUpStrategy);
passport.use("google", googleStrategy);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, user);
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    // return cb(null, user);
  });
});

export default passport;
