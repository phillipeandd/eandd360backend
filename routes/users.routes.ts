import { Router } from "express";
import upload from "../modules/fileupload";
import {
  getUsers,
  createUser,
  getUsersByempId,
  getUsersById,
  updateUsersById,
  getAllUsers,
  getUsersLoginDetails,
  updateUser,
  getAdminData
} from "../controllers/users.controller";
import { getUsersAvailability } from "../controllers/attendance.controller";

const router = Router();
router.get("/info", getAllUsers);
router.get("/availability", getUsersAvailability);
router.post("/login", getUsersLoginDetails);

router.get("/:status", getUsers);
router.get("/info/:empId", getUsersById);

router.get("/data/:Id", getUsersByempId);
router.get("/admin/info", getAdminData);
router.post(
  "/",
  upload.fields([
    { name: "aadhar_img" },
    { name: "pancard_img" },
    { name: "ssc" },
    { name: "intermediate" },
    { name: "diploma" },
    { name: "bachelor" },
    { name: "master" },
    { name: "marks_memo" },
    { name: "transfer_certificate" },
    { name: "offer_letter" },
    { name: "experience_certificate" },
    { name: "increment_letter" },
    { name: "resignation_letter" },
    { name: "payslips" },
    { name: "passport_size_photo" },
  ]),
  createUser
);

router.put(
  "/:Id",
  upload.fields([
    { name: "aadhar_img" },
    { name: "pancard_img" },
    { name: "ssc" },
    { name: "intermediate" },
    { name: "diploma" },
    { name: "bachelor" },
    { name: "master" },
    { name: "marks_memo" },
    { name: "transfer_certificate" },
    { name: "offer_letter" },
    { name: "experience_certificate" },
    { name: "increment_letter" },
    { name: "resignation_letter" },
    { name: "payslips" },
    { name: "passport_size_photo" },
  ]),
  updateUser
);

router.put("/data/:Id", updateUsersById);
// app.get("/user/:empId", async (req: any, res: any) => {
//   const data = await prisma.users.findMany({
//     where: {
//       employee_id: req.params.empId,
//     },
//   });
//   res.status(200);
//   res.send(data);
// });
export default router;
