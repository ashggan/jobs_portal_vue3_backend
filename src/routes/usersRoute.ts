import { PrismaClient, User } from "@prisma/client";
import { Response, Request, Application } from "express";
import passport from "../config/auth";

const prisma = new PrismaClient();

function errorHandler(err: Error, req: Request, res: Response, next: Function) {
  console.error(err);
  res.status(500).json({ message: "An error occurred during authentication." });
}

// function errorMsg
// user sign up route
const signUp = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    // console.log(res);
    res.json(req.user);
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

// user sign in route
const signIn = async (req: Request, res: Response) => {
  try {
    res.json(req.user);
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

const users_routes = (app: Application) => {
  app.post(
    "/users/signup",
    passport.authenticate("signup"),
    errorHandler,
    signUp
  );
  app.post(
    "/users/signin",
    passport.authenticate("signin"),
    errorHandler,
    signIn
  );
};

export default users_routes;
