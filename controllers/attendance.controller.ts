import Express, { Request, Response, NextFunction } from "express";
import * as AttendanceService from "../services/attendance.service";
import { attendance_available_status } from "@prisma/client";

interface TypedRequest extends Request {
  params: {
    empId: string;
  };
  query: {
    date: string;
    doj?: string;
  };
  body: {
    status: attendance_available_status;
    attendId: number;
  };
}
interface IAttendanceUpdateData {
  status: string;
  breaks: {
    create?: {
      break_start?: Date;
    };
    update?: {
      where: {
        id: number;
      };
      data: {
        break_end?: Date;
      };
    };
  };
}

export const getUserAttendance = async (req: TypedRequest, res: Response) => {
  const { empId } = req.params;
  let { date } = req.query;
//  return res.status(200).json(date);
  try {
    const emp_attendance: any = await AttendanceService.getUserAttendance(
      empId,
      date
    );

    if (!emp_attendance) {
      res.status(500).json({ message: "empty" });
    }

    res.status(200).json(emp_attendance);
    return;
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ error, message: error.message });
    return;
  }
};

export const getUserAvailability = async (req: TypedRequest, res: Response) => {
  const { empId } = req.params;
  try {
    const presentUserStatus = await AttendanceService.getUserAvailability(
      empId
    );

    res.status(200).json(presentUserStatus);
    return;
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ error, message: error.message });
    return;
  }
};
export const getUsersAvailability = async (
  req: TypedRequest,
  res: Response
) => {
  try {
    const presentUsers = await AttendanceService.getAvailableUsers();

    res.status(200).json(presentUsers);
    return;
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ error, message: error.message });
    return;
  }
};
export const markUserAttendance = async (req: TypedRequest, res: Response) => {
  const { empId } = req.params;
  try {
    const markAttendance = await AttendanceService.markUserAttendance(empId);
    res.status(201).json(markAttendance);
    return;
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ error, message: error.message });
    return;
  }
};

export const markUserLogOff = async (req: TypedRequest, res: Response) => {
  const { empId } = req.params;
  try {
    const checkUserAvailable = await AttendanceService.getUserAvailability(
      empId
    );
    if (checkUserAvailable.status != "available") {
      throw new Error("First Change Your Status to Available then Log out");
    }

    const markLogOff = await AttendanceService.markUserLogOff(empId);
    return res.status(200).json(markLogOff);
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ error, message: error.message });
    return;
  }
};

export const updateUserAvailibilityStatus = async (
  req: TypedRequest,
  res: Response
) => {
  const { empId } = req.params;
  const { status } = req.body;
  let attendId;
  try {
    if (status == "unavailable") {
      throw new Error("Cannot Set Unavailable");
    }

    const presentUserStatus = await AttendanceService.getUserAvailability(
      empId
    );

    if (status == presentUserStatus.status) {
      throw new Error(`Status is already ${status}`);
    }

    if (
      presentUserStatus.status == "unavailable" &&
      (status == "available" || status == "break" || status == "salah")
    ) {
      throw new Error("mark attendance before requesting for update of status");
    }

    if (
      presentUserStatus.status == "available" ||
      presentUserStatus.status == "break" ||
      presentUserStatus.status == "salah"
    ) {
      const userAttendance = await AttendanceService.userTodayAttendance(empId);

      if (userAttendance == null) {
        throw new Error("Mark Attendance First before requesting for a break");
      }
      attendId = userAttendance.id;
    }

    const updatedAttendanceStatus =
      await AttendanceService.updateUserAvailibilityStatus(
        empId,
        attendId,
        presentUserStatus.status,
        status
      );

    res.status(200).json(updatedAttendanceStatus);
    return;
  } catch (error: any) {
    console.error(error.message);
    console.error(error);
    res.status(400).json({ message: error.message });
    return;
  }
};
export const editPoints=async(req:Request ,res:Response)=>{
 const {Id}=req.params;
 const { points } = req.body;
 try {
  const markAttendance = await AttendanceService.editPoints(Id,points);
  res.status(201).json(markAttendance);
  return;
} catch (error: any) {
  console.error(error);
  res.status(400).json({ error, message: error.message });
  return;
}
}