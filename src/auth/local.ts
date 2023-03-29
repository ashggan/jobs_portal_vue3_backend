import { PrismaClient } from "@prisma/client";
import { Strategy } from "passport-local";
import { hash, compare } from "./utils";
import passport from "passport";
import { Request } from "express";

require("dotenv").config();

// Initialize a prisma client
const prisma = new PrismaClient();

// Set strategy options
const options = {
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true,
};

export default class userService {
  async signUp(req: Request) {
    try {
      const email = req.body as string;
      // check if user exist
      const existsEmail = await prisma.user.findUnique({
        where: { email: "req.body.email" },
      });
    } catch (error) {
      throw new Error("Failed to sign up");
    }
  }
}
