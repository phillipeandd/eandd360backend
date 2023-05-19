import { Router } from "express";
import upload from "../modules/fileupload";
import {
  getLeaves,
  postLeaves,
  getLeavesByid,
  putLeaves,
  getComAdvSug,
  getComAdvSugById,
  postComAdvSug,
  getLetters,
  getLettersByempId,
  createLetters,
  getLeavesByRole,
  postComAdvSugReply,
} from "../controllers/letter_genaration.controller";

const router = Router();

router.get("/comadvsug", getComAdvSug);
router.get("/letters", getLetters);
router.get("/letters/:empId", getLettersByempId);
router.get("/comadvsug/:empId", getComAdvSugById);
router.post("/letters", upload.single("uploaded_file"), createLetters);
router.post("/comadvsug/", postComAdvSug);
//router.post("/postComAdvSugReply/:Id", postComAdvSugReply);
router.put("/postComAdvSugReply/:Id",postComAdvSugReply);
// employee_complants_advices_suggestions
router.get("/", getLeaves);
router.get("/:role", getLeavesByRole);
router.get("/user/:empId", getLeavesByid);
router.post("/", postLeaves);
router.put("/:Id", putLeaves);

export default router;
