import prisma from "../utils/prisma";
export const get = async (req: any, res: any) => {
  try {
    return await prisma.employee_notification.findMany({});
  } catch (error) {
    throw new Error("Error While getting all users notifications");
  }
};

export const getById = async (req: any, res: any) => {
  try {
    return await prisma.employee_notification.findMany({
      where: {
        receiver_employeeId: req.params.empId,
      },
    });
  } catch (error) {
    throw new Error("Error While getting user notification");
  }
};

export const postData = async (req: any, res: any) => {
  return await prisma.employee_notification.create({
    data: {
      receiver_employeeId: req.body.receiver_employeeId,
      sender_employeeId: req.body.receiver_employeeId,
      message: req.body.message,
    },
  });
};
