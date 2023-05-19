import { Router } from "express";
import {
  getNotifications,
  getNotificationsById,
  postNotifications,
} from "../controllers/notifications.controller";
const router = Router();
router.get("/", getNotifications);
router.get("/:empId", getNotificationsById);
router.post("/", postNotifications);
export default router;
