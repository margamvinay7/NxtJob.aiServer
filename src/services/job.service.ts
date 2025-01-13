import prisma from "../prisma/client";
import { JobInput } from "../types";

// Create a new job
const createJob = async (data: JobInput) => {
  return await prisma.job.create({ data });
};

// Get all jobs
const getAllJobs = async () => {
  return await prisma.job.findMany();
};

// Get a job by ID
const getJobById = async (id: number) => {
  return await prisma.job.findUnique({ where: { id } });
};

// Update a job by ID
const updateJob = async (id: number, data: JobInput) => {
  // check if the job exist
  const jobExists = await prisma.job.findUnique({ where: { id } });
  if (!jobExists) {
    throw new Error(`Job with ID ${id} not found`);
  }

  // update job
  return await prisma.job.update({ where: { id }, data });
};

// Delete a job by ID
const deleteJob = async (id: number) => {
  // check if the job exist
  const jobExists = await prisma.job.findUnique({ where: { id } });
  if (!jobExists) {
    throw new Error(`Job with ID ${id} not found`);
  }

  // delete job
  return await prisma.job.delete({ where: { id } });
};

export default { createJob, getAllJobs, getJobById, updateJob, deleteJob };
