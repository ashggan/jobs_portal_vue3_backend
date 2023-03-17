import { PrismaClient } from "@prisma/client";
import { Response, Request, Application } from "express";

const prisma = new PrismaClient();

// save a job
const saveJob = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const results = await prisma.job.create({ data });
    res.status(201).json(results);
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

// retrive list of jobs
const allJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await prisma.job.findMany();
    res.json(jobs);
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

const jobs_routes = (app: Application) => {
  app.post("/jobs/save", saveJob);
};

export default jobs_routes;
