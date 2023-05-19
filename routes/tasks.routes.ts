import { Router } from "express";
import {
  getTaskDetails,
  getDetailsById,
  getTaskList,
  deleteDetailsById,
  updateTaskStatusByID,
  getPendingTaskById
} from "../controllers/tasks.controller";
import upload from "../modules/fileupload";
import {createUserPms} from "../controllers/pms.controller"
const router = Router();

router.get("/", getTaskList);
router.post("/:Id", upload.single("file"), getTaskDetails);
router.put("/:Id", getTaskDetails);
router.get("/:empId", getDetailsById);
router.put("/status/:Id", updateTaskStatusByID);
router.delete("/:Id", deleteDetailsById);
router.get("/status/:Id",getPendingTaskById);
router.post("/createpms",createUserPms)
export default router;
