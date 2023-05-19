import { Router } from "express";
import {
  createInterviewEvent,
  updateInterviewEvent,
  getHrInterviewEvents,
} from "../controllers/interviews.controller";
const router = Router();

//---------------------------

router.get("/:userId", getHrInterviewEvents);
router.post("/:userId", createInterviewEvent);
router.put("/:userId/:eventId", updateInterviewEvent);

export default router;
