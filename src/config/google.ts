import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import * as dotenv from "dotenv";
import passport from "passport";
// import prisma from "./prisma";
dotenv.config();

const options = {
  clientID: process.env.GOOGLE_CLIENT_ID as string,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  callbackURL: "/auth/google",
};

const verifyCallback = (
  accessToken: string,
  refreshToken: string,
  profile: passport.Profile,
  done: Function
) => {
  console.log(profile);
  return done(null, profile);
};

const googleStrategy = new GoogleStrategy(options, verifyCallback);
// );

export { googleStrategy };
