import prisma from "../utils/prisma";
import {
  addDays,
  format,
  set,
  addHours,
  differenceInMinutes,
  getMonth,
  getYear,
  isValid,
} from "date-fns";
import { attendance_available_status } from "@prisma/client";
import * as ShiftService from "../services/shifts.service";
import { resignationData } from "../controllers/exits.controller";

interface IAvailableUser {
  employee_id: string;
  status: string;
}

export const getUserAttendance = async (userId: string, date: string) => {
  try {
    // const user: any = await prisma.users.findUnique({
    //   where: { employee_id: userId },
    //   select: {
    //     doj: true,
    //   },
    // });

    let attendance_start_date = set(new Date(), {
      date: 1,
      hours: 0,
      minutes: 0,
      milliseconds: 0,
    });

    if (date != null && isValid(new Date(date))) {
      attendance_start_date = set(attendance_start_date, {
        month: getMonth(new Date(date)),
        year: getYear(new Date(date)),
      });
    }

    let attendance_end_date = set(attendance_start_date, {
      month: getMonth(attendance_start_date) + 1,
    });

    const emp_attendance = await prisma.attendance.findMany({
      where: {
        employee_id: userId,
        date_in: {
          gte: attendance_start_date,
          lte: attendance_end_date,
        },
      },
      include: {
        breaks: {
          select: {
            break_start: true,
            break_end: true,
          },
        },
      },
    });

    return emp_attendance;
  } catch (e) {
    console.error(e);
    throw Error("Error While Getting User Attendance");
  }
};

export const markUserAttendance = async (userId: string) => {
  try {
    //check if todays attendance is made else mark attendance
    const isUserPresentToday = await userTodayAttendance(userId);
    if (isUserPresentToday != null) {
      return { message: "Attendance Already Marked", status: 409 };
    }

    let shift_in = new Date();
    let shift_out = addHours(new Date(), 9);
    const userShift = await ShiftService.getUserShift(userId);

    if (userShift != null) {
      shift_in = userShift.shift_in;
      shift_out = userShift.shift_out;
    }
    const late_minutes = differenceInMinutes(shift_in, new Date());
    let login_penalty;
    const penalty = await prisma.policies_attedance.findFirst({
      where: {
        start_minutes: {
          gte: late_minutes,
        },
        end_minutes: {
          lte: late_minutes,
        },
      },
    });
    var date =  new Date();
    //var d=date.toTimeString()
    // console.log(date.toTimeString())
    const dt=date.setHours(date.getHours(),date.getMinutes(),date.getSeconds())
    const st=date.setHours(shift_in.getHours(),shift_in.getMinutes(),shift_in.getSeconds())
    //var s=shift_in.toTimeString()
    let diff_in_min = differenceInMinutes(dt, st);
    let points=null;
  if(diff_in_min<8){
    points=0;
  }
  else if(diff_in_min>7 && diff_in_min <=15)
  {
    points=1;
  }
  else if(diff_in_min>15 && diff_in_min <=25)
  {
    points=2;
  }
  else if(diff_in_min>25 && diff_in_min <=40)
  {
    points=3;
  }
  else if(diff_in_min>40 && diff_in_min <=90)
  {
    points="Half day + 4";
  }
  else{
    points="Half day + 3 + 5";
  }
 
  
    const markAttendance = await prisma.attendance.create({
      data: {
        employee_id: userId,
        shift_in,
        shift_out,
        date_in: new Date(),
        log_in: new Date(),
        points:points.toString(),
        status: attendance_available_status.available,
      },
    });
    return markAttendance;
  } catch (error) {
    console.error(error);
    throw Error("Error While Marking User Attendance");
  }
};

export const updateUserAvailibilityStatus = async (
  userId: string,
  attendanceId: any,
  presentAttendanceStatus: string,
  status: attendance_available_status
) => {
  try {
    let shift_time_in = new Date();
    let shift_time_out = new Date();

    if (status == "break") {
      //Break start
      const attendanceUpdate = await prisma.attendance.update({
        where: {
          id: parseInt(attendanceId),
        },
        data: {
          status,
          breaks: {
            create: {
              break_start: new Date(),
            },
          },
        },
      });

      return attendanceUpdate;
    }

    if (
      presentAttendanceStatus == "break" &&
      (status == "available" || status == "salah")
    ) {
      //Break End
      const userLastBreak = await prisma.breaks.findFirst({
        where: {
          attendanceId: attendanceId,
        },
        orderBy: { id: "desc" },
      });

      if (userLastBreak != null) {
        // if break exist and set break end
        const break_id = userLastBreak.id;
        const attendanceUpdate = await prisma.attendance.update({
          where: {
            id: attendanceId,
          },
          data: {
            status,
            breaks: {
              update: {
                where: {
                  id: break_id,
                },
                data: { break_end: new Date() },
              },
            },
          },
        });
        return attendanceUpdate;
      }
    }

    if (
      (presentAttendanceStatus == "available" && status == "salah") ||
      (presentAttendanceStatus == "salah" && status == "available")
    ) {
      const attendanceUpdate = await prisma.attendance.update({
        where: {
          id: parseInt(attendanceId),
        },
        data: {
          status,
        },
      });
      return attendanceUpdate;
    }
  } catch (error) {
    console.error(error);
    throw Error("Error While Updating User Availability Status");
  }
};

export const getUserAvailability = async (userId: string) => {
  //check if today present then get availability status from attendance
  try {
    const isUserPresentToday = await userTodayAttendance(userId);
    if (isUserPresentToday == null) {
      return { status: "unavailable" };
    }

    return { status: isUserPresentToday.status };
  } catch (error) {
    console.error(error);
    throw Error("Error While Getting Availability Status");
  }
};

export const getAvailableUsers = async () => {
  //check if today present then get availability status from attendance
  try {
    let presentUsers: IAvailableUser[] = [];
    const allUsers = await prisma.users.findMany({
      where: {
        NOT: {
          role: "admin",
        },
      },
      select: {
        employee_id: true,
        role: true,
      },
    });

    const result = await allUsers.map(async (user, index) => {
      const isUserPresentToday = await userTodayAttendance(user.employee_id);
      if (isUserPresentToday == null) {
        return;
      }

      const pUser = {
        id: isUserPresentToday.id,
        employee_id: isUserPresentToday.employee_id,
        status: isUserPresentToday.status,
        first_name: isUserPresentToday.user.first_name,
        last_name: isUserPresentToday.user.last_name,
        profile_img: isUserPresentToday.user.passport_size_photo,
        log_in: isUserPresentToday.log_in,
        shift_in: isUserPresentToday.shift_in,
      };
      presentUsers.push(pUser);
    });
    await Promise.all(result);

    return { users: presentUsers };
  } catch (error) {
    console.error(error);
    throw Error("Error While Getting Availability Status");
  }
};
export const userTodayAttendance = async (userId: string) => {
  let shift_in = new Date();
  let shift_out = addHours(new Date(), 9);
  try {
    const userShift = await ShiftService.getUserShift(userId);

    if (userShift != null) {
      shift_in = userShift.shift_in;
      shift_out = userShift.shift_out;
    }

    const date_in = new Date(format(new Date(), "yyyy-MM-dd"));
    const an_hour_before_shift_log_in = set(shift_in, {
      hours: shift_in.getHours() - 1,
    });

    const checkTodaysAttendance = await prisma.attendance.findFirst({
      where: {
        employee_id: userId,
        date_in,
        log_in: {
          gte: an_hour_before_shift_log_in,
        },
      },
      orderBy: {
        created_at: "desc",
      },
      include: {
        user: {
          select: {
            first_name: true,
            last_name: true,
            passport_size_photo: true,
            username: true,
          },
        },
      },
    });
    return checkTodaysAttendance;
  } catch (error) {
    console.error(error);
    throw Error("Error While Checking User Attendance for Today");
  }
};

export const markUserLogOff = async (userId: string) => {
  try {
    const userAvailability = await getUserAvailability(userId);
    if (userAvailability.status != "available") {
      throw new Error("Change Status to Available before logOff");
    }
    const userAttendance = await userTodayAttendance(userId);
    let shift_out = addHours(new Date(), 9);
    let points;
    if (userAttendance != null) {
      shift_out = userAttendance.shift_out;
      points=userAttendance.points;
    }
    var date =  new Date();
    var date2=new Date();
    const shift_out_time=date.setHours(shift_out.getHours(),shift_out.getMinutes(),shift_out.getSeconds())
    const logout_time=date2.getTime();
    var diff_in_mins= differenceInMinutes(shift_out_time,logout_time)
    if(diff_in_mins>15 && diff_in_mins<40){
      points=points+" + 0.5";
    }else if(diff_in_mins>=40){
      points=points+" + 4 ";
    }
    const userLogOff = await prisma.attendance.update({
      where: {
        id: userAttendance?.id,
      },
      data: {
        points:points,
        log_out: new Date(),
      },
    });
    return userAttendance;
  } catch (error) {
    throw new Error("Error While updating attendance");
  }
};
export const editPoints=async(Id: string, points: string)=>{
  try {
    const updatePoints= await prisma.attendance.update({
      where:{
        id:parseInt(Id)
      },
      data:{
        "points":points
      }
    });
    return updatePoints;
  } catch (error) {
    throw new Error("Error While updating points");
  }
}
