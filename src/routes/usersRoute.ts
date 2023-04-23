import { Response, Request, Application } from "express";
import passport from "../config/passport";

declare module "express-session" {
  interface SessionData {
    views: number;
  }
}

// user sign in route
const signin =
  (name: string) => async (req: Request, res: Response, next: Function) => {
    await passport.authenticate(
      name,
      (err: Error, user: any, info: { message: string } | undefined) => {
        if (err) {
          res.send(err);
        }

        // If authentication fails, return error message
        if (!user) {
          return res.status(401).json({ message: info?.message });
        }
        // If authentication is successful, return user object
        res.json(user);
      }
    )(req, res, next);
  };

const users_routes = (app: Application) => {
  app.post("/users/signup", signin("signup"));
  app.post("/users/signin", signin("signin"));
  app.get(
    "/users/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );
  app.post("/users/linkedin", signin("linkedin"));
  app.get("/home", (req: Request, res: Response) => {
    // console.log(req.session);
    // req.session.views = (req.session.views ?? 0) + 1;
    // res.send(`yuo visited this site ${req.session.views} times`);
    res.render("../views/index.html");
  });
  app.get("/auth/google", (req: Request, res: Response) => {
    res.send("you are in");
  });
};
export default users_routes;
