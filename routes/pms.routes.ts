
import { Router } from "express";
import {
createUserPms,
getUserPms,
getUserPmsByYear,
getAllPms,
getAllPmsByYear,
getAdminPms

} from "../controllers/pms.controller";

const router = Router();
router.post("/createPms", createUserPms);
router.get("/:empId",getUserPms); //only user
router.get("/year/:empId",getUserPmsByYear); //only user
router.get('/getAllPms/:empId',getAllPms);
router.get('/getAllPms/year/:empId',getAllPmsByYear); //admin/hr
router.get('/getAdminPms/:empId',getAdminPms);
export default router;
