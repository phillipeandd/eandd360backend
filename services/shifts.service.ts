import { users_status } from "@prisma/client";
import prisma from "../utils/prisma";

export const getAllUsersShift = async (department: string | undefined) => {
  try {
    const usersShift = await prisma.users.findMany({
      where: {
        department,
        status: users_status.accepted,
      },
      select: {
        id: true,
        username: true,
        employee_id: true,
        passport_size_photo: true,
        first_name: true,
        last_name: true,
        shifts: {
          take: 1,
          orderBy: {
            created_at: "desc",
          },
          select: {
            shift_in: true,
            shift_out: true,
            created_at: true,
          },
        },
      },
    });
    return usersShift;
  } catch (error) {
    throw new Error("Error While getting users & their shifts");
  }
};

export const getUserShift = async (userId: string) => {
  try {
    const userShift = await prisma.shift_timings.findFirst({
      where: {
        employee_id: userId,
      },
      orderBy: {
        created_at: "desc",
      },
    });
    return userShift;
  } catch (error) {
    throw new Error("Error While getting user shifts");
  }
};

export const getUserShifts = async (userId: string, date: string) => {
  try {
    const userShifts = await prisma.shift_timings.findMany({
      where: {
        employee_id: userId,
        // created_at: {
        //   gte: new Date(date),
        // },
      },
      orderBy: {
        created_at: "desc",
      },
    });
    return userShifts;
  } catch (error) {
    throw new Error("Error While getting user shifts");
  }
};

export const createUserShift = async (
  userId: string,
  shift_in: string,
  shift_out: string
) => {
  try {
    const userShift = await prisma.shift_timings.create({
      data: {
        employee_id: userId,
        shift_in: new Date(shift_in),
        shift_out: new Date(shift_out),
      },
    });
    return userShift;
  } catch (error) {
    throw new Error("Error While create user shift");
  }
};

export const createUsersShift = async (
  userIds: string[],
  shift_in: string,
  shift_out: string
) => {
  try {
    const userShift = await prisma.shift_timings.createMany({
      data: userIds.map((userId) => ({
        employee_id: userId,
        shift_in: new Date(shift_in),
        shift_out: new Date(shift_out),
      })),
    });
    return userShift;
  } catch (error: any) {
    throw new Error("Error While create users shifts");
  }
};
