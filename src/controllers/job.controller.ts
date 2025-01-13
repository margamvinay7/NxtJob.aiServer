import { Request, Response } from "express";
import jobService from "../services/job.service";
import { sanitizeData } from "../utils/sanitizer";
import { JobOutput } from "../types";

export const createJob = async (
  req: Request,
  res: Response
): Promise<JobOutput | any> => {
  try {
    const sanitizedData = sanitizeData(req.body);
    const job = await jobService.createJob(sanitizedData);
    res.status(201).json(job);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getJobs = async (
  req: Request,
  res: Response
): Promise<JobOutput[] | any> => {
  try {
    const jobs = await jobService.getAllJobs();
    res.status(200).json(jobs);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getJobById = async (
  req: Request,
  res: Response
): Promise<JobOutput | any> => {
  try {
    const job = await jobService.getJobById(Number(req.params.id));
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.status(200).json(job);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateJob = async (
  req: Request,
  res: Response
): Promise<JobOutput | any> => {
  try {
    const sanitizedData = sanitizeData(req.body);
    const job = await jobService.updateJob(
      Number(req.params.id),
      sanitizedData
    );
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.status(200).json(job);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteJob = async (req: Request, res: Response): Promise<void> => {
  try {
    await jobService.deleteJob(Number(req.params.id));
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
