import { Router } from "express";
import * as compensation from "../controllers/compensation.controller";
const router = Router();

router.post("/", compensation.create);
router.get("/:empId", compensation.getDate);
export default router;
