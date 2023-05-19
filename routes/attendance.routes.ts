import { Router } from "express";
import {
  getUserAttendance,
  markUserAttendance,
  updateUserAvailibilityStatus,
  getUserAvailability,
  markUserLogOff,
  getUsersAvailability,
  editPoints
} from "../controllers/attendance.controller";

const router = Router();
router.get("/:empId", getUserAttendance);
router.post("/:empId", markUserAttendance);
router.put("/:empId", markUserLogOff);
router.get("/:empId/availability", getUserAvailability);
router.put("/:empId/availability", updateUserAvailibilityStatus);
router.put("/edit/:Id",editPoints);

export default router;
