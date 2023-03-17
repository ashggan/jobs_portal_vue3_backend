import express from "express";
import jobs_routes from "./routes/jobsRoutes";
import categories_routes from "./routes/categoryRoute";

const app = express();
app.use(express.json());

// routes
jobs_routes(app);
categories_routes(app);

const PORT = 5001;
app.listen(PORT, () =>
  console.log(`SERVER RUNNING on http://localhost:${PORT}`)
);

export default app;
