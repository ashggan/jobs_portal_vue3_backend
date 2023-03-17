import { Response, Request, Application } from "express";
import { PrismaClient } from "@prisma/client";
import { Category } from "../models/categoryModel";

const prisma = new PrismaClient();

// create new category
const createCategory = async (req: Request, res: Response) => {
  try {
    const data: Category = req.body;
    const results = await prisma.category.create({ data });
    res.status(201).json(results);
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

// retrive a list of categories
const allCategories = async (req: Request, res: Response) => {
  try {
    const cats = await prisma.category.findMany();
    res.json(cats);
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

// find category by ID
const findCategory = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const category = await prisma.category.findUnique({
      where: { id: +id },
    });
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

// update category
const updateCategory = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const updatedCategory = await prisma.category.update({
      where: { id: +id },
      data: data,
    });

    res.status(200).json(updatedCategory);
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

//delete category
const deleteCategory = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const deletedCategory = await prisma.category.delete({
      where: { id: +id },
    });
    res.status(200).json(deleteCategory);
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

const categories_routes = (app: Application) => {
  app.get("/categories", allCategories);
  app.post("/categories/create", createCategory);
  app.get("/categories/:id", findCategory);
  app.put("/categories/:id", updateCategory);
  app.delete("/categories/:id", deleteCategory);
};

export default categories_routes;
