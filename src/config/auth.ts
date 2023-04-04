import { PrismaClient, User } from "@prisma/client";
import { Strategy } from "passport-local";
import { hash, compare } from "./jwt";
import passport from "passport";
// import { Request } from "express";

require("dotenv").config();

// Initialize a prisma client
const prisma = new PrismaClient();

// Set strategy options
const options = {
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true,
};

// const signup = new Strategy("sign-up", {});
passport.use(
  "signup",
  new Strategy(async (email, password, done) => {
    try {
      // const { email , name , password } = req.body
      console.log("sd");
      const user = await prisma.user.findUnique({
        where: { email },
      });

      const data = {
        password: await hash(password),
        email,
        name: "",
      };
      // Create the user
      const NewUser = await prisma.user.create({
        data,
      });

      // await prisma.user.create({ data });
      return done(null, NewUser);
    } catch (error) {
      return done(error);
    }
  })
);

export default passport;
