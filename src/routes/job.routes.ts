import { Router } from "express";
import {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
} from "../controllers/job.controller";
import { validateJob } from "../middlewares/validation.middleware";

const router = Router();

router.post("/", validateJob, createJob);
router.get("/", getJobs);
router.get("/:id", getJobById);
router.put("/:id", validateJob, updateJob);
router.delete("/:id", deleteJob);

export default router;
