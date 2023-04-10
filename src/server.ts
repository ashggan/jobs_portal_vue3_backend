import express from "express";
import jobs_routes from "./routes/jobsRoutes";
import users_routes from "./routes/usersRoute";
import expressSession from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import passport from "passport";
import prisma from "./config/prisma";

// import categories_routes from "./routes/categoryRoute";
import("./config/passport");

const app = express();
app.use(express.json());

app.use(
  expressSession({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    secret: "a santa at nasa",
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 10 * 60 * 1000, // 10 minutes
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

/* 
routes  
**/
jobs_routes(app);
users_routes(app);
// categories_routes(app);

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`SERVER RUNNING on http://localhost:${PORT}`)
);

export default app;
