import { Router } from "express";
import {
  getUserShifts,
  createUserShift,
  getAllUsersShift,
  createUsersShift,
} from "../controllers/shifts.controller";

const router = Router();
router.get("/", getAllUsersShift);
router.post("/", createUsersShift);
router.get("/:empId", getUserShifts);
router.post("/:empId", createUserShift);

export default router;
