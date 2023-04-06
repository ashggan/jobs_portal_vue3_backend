import { PrismaClient, User } from "@prisma/client";
import { Response, Request, Application } from "express";
import passport from "../config/auth";

declare module "express-session" {
  interface SessionData {
    views: number;
  }
}

const prisma = new PrismaClient();

function errorHandler(err: Error, req: Request, res: Response, next: Function) {
  console.error("err", err);
  res.status(500).json({ message: "An error occurred during authentication." });
}

// function errorMsg
// user sign up route

// user sign in route
const signin =
  (name: string) => async (req: Request, res: Response, next: Function) => {
    console.log(passport);
    await passport.authenticate(
      name,
      (err: Error, user: any, info: { message: string } | undefined) => {
        if (err) {
          console.error(err);
          return next(err);
        }
        if (!user) {
          // If authentication fails, return error message
          return res.status(401).json({ message: info?.message });
        }
        // If authentication is successful, return user object
        res.json(req.user);
      }
    )(req, res, next);
  };

const users_routes = (app: Application) => {
  app.post("/users/signup", signin("signup"));
  app.post("/users/signin", signin("signin"));
  app.get("/", (req: Request, res: Response) => {
    console.log(req.session);

    req.session.views = (req.session.views ?? 0) + 1;
    res.send(`yuo visited this site ${req.session.views} times`);
  });
};

export default users_routes;
