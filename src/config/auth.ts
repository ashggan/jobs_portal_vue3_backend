import { PrismaClient } from "@prisma/client";
import { Strategy as LocalStrategy } from "passport-local";

import { hash, compare } from "./jwt";
import passport from "passport";

require("dotenv").config();

// Initialize a prisma client
const prisma = new PrismaClient();

// Set strategy options
const options = {
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true,
};

//  create local Strategy sign in
passport.use(
  "signin",
  new LocalStrategy({ usernameField: "email" }, async function (
    email: string,
    password: string,
    done: Function
  ) {
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return done(null, false, { message: "Incorrect email or password." });
      }

      const isMatch = await compare(password, user.password);

      if (!isMatch)
        return done(null, false, { message: "Incorrect email or password." });

      return done(user, null);
    } catch (error) {
      return error;
    }
  })
);

passport.use(
  "signup",
  new LocalStrategy({ usernameField: "email" }, async function (
    email: string,
    password: string,
    done: Function
  ) {
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (user) {
        return done(user, false, { message: " email already exist !" });
      }

      const hashed = await hash(password);

      const data = {
        name: "",
        email,
        password: hashed,
      };
      const newUser = await prisma.user.create({ data });

      return done(newUser, null);
    } catch (error) {
      return error;
    }
  })
);

export default passport;
