import { PrismaClient } from "@prisma/client";
import { Category } from "./categoryModel";

export type Job = {
  id: number;
  category_id: number;
  latitude: number;
  location: Location;
  category: Category;
  salary_max: number;
  created: Date;
  salary_is_predicted: string;
  salary_min: number;
  description: string;
  contract_type: string;
  redirect_url: string;
  company: string;
  title: string;
  user_id: number;
};

const prisma = new PrismaClient();

export class JobService {
  async findAll(): Promise<Job[]> {
    try {
      const allUsers = await prisma.Job.findMany();

      return allUsers;
    } catch (async (error: any) => {
        console.error(error)
        await prisma.$disconnect()
        process.exit(1)
    })
        
    
  }
}
