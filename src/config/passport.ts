import { Strategy as LocalStrategy, Strategy } from "passport-local";
// import { hash, compare } from "./jwt";
import passport from "passport";
import prisma from "./prisma";
import { genPassword, validPassword } from "./password";
import { User } from "@prisma/client";

require("dotenv").config();

// Set strategy options
const options = {
  usernameField: "email",
  passwordField: "password",
};

// Set strategy verifyCallBack
const verifyCallBack = async (
  email: string,
  password: string,
  done: Function
) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return done(null, false, { message: "Account doesn't exist" });

    const isValid = validPassword(password, user.password, user.salt);
    if (!isValid)
      return done(null, false, { message: "Incorrect username or password." });

    return done(null, user);
  } catch (error) {
    done(error);
  }
};

// Set strategy verifyCallBack
const verifyCallBackSignUp = async (
  email: string,
  password: string,
  done: Function
) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (user) return done(null, false, { message: "Account already exist" });

    const { salt, passWord } = genPassword(password);
    const data = {
      name: "user",
      salt,
      password: passWord,
      email,
    };

    const newUser = await prisma.user.create({ data });

    return done(null, newUser);
  } catch (error) {
    done(error);
  }
};

const sigInStrategy = new Strategy(options, verifyCallBack);
const signUpStrategy = new Strategy(options, verifyCallBackSignUp);

//  create local Strategy sign in
passport.use("signin", sigInStrategy);
passport.use("signup", signUpStrategy);

export default passport;
