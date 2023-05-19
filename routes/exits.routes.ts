import { Router } from "express";
import {
  resignationData,
  createResignationData,
  updateResignationData,
  resignationDataById,
  feedBackForm,
  feebBackByid,
  checkList,
  createCheckList,
  getcheckListById,
} from "../controllers/exits.controller";
const router = Router();
router.get("/checklists", checkList);
router.get("/checklists/:empId", getcheckListById);
router.post("/checklists", createCheckList);
router.get("/", resignationData);
router.get("/:empId", resignationDataById);
router.post("/", createResignationData);
router.put("/:empId", updateResignationData);
router.post("/feedback", feedBackForm);
router.get("/feedback/:empId", feebBackByid);

export default router;
