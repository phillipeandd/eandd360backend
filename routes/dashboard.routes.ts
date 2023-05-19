import { Router } from "express";
import * as dashboard from "../controllers/dashboard.controller";
const router = Router();
router.get("/admin", dashboard.admin);
router.get("/hr", dashboard.hr);
router.get("/user/:empId", dashboard.user);

export default router;
