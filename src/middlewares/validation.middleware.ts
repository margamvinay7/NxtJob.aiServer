import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const JobSchema = z.object({
  title: z.string().min(1).max(255),
  company: z.string().min(1).max(255),
  location: z.string().min(1).max(255),
  salary: z.number().positive(),
  description: z.string().min(1),
});

export const validateJob = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    JobSchema.parse(req.body);
    next();
  } catch (error: any) {
    res.status(400).json({ message: error.errors });
  }
};
