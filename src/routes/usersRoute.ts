import { PrismaClient } from "@prisma/client";
import { Response, Request, Application } from "express";
import passport from "../config/auth";

const prisma = new PrismaClient();

// user sign up route
const signUp = async (req: Request, res: Response) => {
  try {
    res.json("req.body");
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};
const signIn = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

const users_routes = (app: Application) => {
  app.post("/users/signup", passport.authenticate("signup"), signUp);
};

export default users_routes;
