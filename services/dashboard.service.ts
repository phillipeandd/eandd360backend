import prisma from "../utils/prisma";
const express = require("express");
import { Request, Response } from "express";
import { getAvailableUsers } from "./attendance.service";

const orBoardRequest: any = async () => {
  return await prisma.users.findMany({
    orderBy: {
      id: "desc",
    },
    where: {
      status: "pending",
    },
  });
};

const letterRequest: any = async (to: string) => {
  const today = new Date();
  const presentMonth = today.getMonth() + 1;
  return await prisma.employee_leaves.findMany({
    orderBy: {
      id: "desc",
    },
    select: {
      id: true,
      employee_id: true,
      leave_status: true,
      leave_dates: true,
      reason: true,
      permission_type: true,
      created_at: true,
      from: true,
      to: true,
      employee: {
        select: {
          username: true,
        },
      },
    },
    where: {
      created_at: {
        gt: new Date(today.getFullYear() + "-" + presentMonth),
      },
      OR: [
        {
          to: to,
        },
        {
          to: "both",
        },
      ],
    },
  });
};

const letterPendingRequest: any = async (to: string) => {
  const today = new Date();
  const presentMonth = today.getMonth() + 1;
  return await prisma.employee_leaves.findMany({
    orderBy: {
      id: "desc",
    },
    where: {
      leave_status: "pending",
      created_at: {
        gt: new Date(today.getFullYear() + "-" + presentMonth),
      },
      OR: [
        {
          to: to,
        },
        {
          to: "both",
        },
      ],
    },
  });
};

const onGoingTaskList: any = async (task_status: any) => {
  const today = new Date();
  const presentMonth = today.getMonth() + 1;
  return await prisma.task.findMany({
    where: {
      status: task_status,
      created_at: {
        gt: new Date(today.getFullYear() + "-" + presentMonth),
      },
    },

    orderBy: {
      id: "desc",
    },
  });
};

const onUserGoingTaskList: any = async (
  req: Request,
  res: Response,
  s: any
) => {
  const today = new Date();
  const presentMonth = today.getMonth() + 1;
  const task_status = s;
  const employee_id = req.params.empId;
  return await prisma.task.findMany({
    where: {
      status: task_status,
      employee_id: employee_id,
      created_at: {
        gt: new Date(today.getFullYear() + "-" + presentMonth),
      },
    },
    orderBy: {
      id: "desc",
    },

    include: {
      employee: {
        select: {
          username: true,
          passport_size_photo: true,
        },
      },
      creator: {
        select: {
          username: true,
          passport_size_photo: true,
        },
      },
    },
  });
};

const userleaveRequest = async (req: Request, res: Response) => {
  const today = new Date();
  const presentMonth = today.getMonth() + 1;
  return await prisma.employee_leaves.findMany({
    orderBy: {
      id: "desc",
    },
    where: {
      created_at: {
        gt: new Date(today.getFullYear() + "-" + presentMonth),
      },
      employee_id: req.params.empId,
    },
  });
};

const userPendingleaveRequest = async (req: Request, res: Response) => {
  const today = new Date();
  const presentMonth = today.getMonth() + 1;
  return await prisma.employee_leaves.findMany({
    where: {
      leave_status: "pending",
      created_at: {
        gt: new Date(today.getFullYear() + "-" + presentMonth),
      },
      employee_id: req.params.empId,
    },
  });
};

export const admin = async (req: Request, res: Response) => {
  return {
    admin_letter_request: (await letterPendingRequest("admin")).length,
    pending_task: (await onGoingTaskList("pending")).length,
    completed_task: (await onGoingTaskList("completed")).length,
    on_going_task_list: await onGoingTaskList("pending"),
    available_users: await getAvailableUsers(),
  };
};

export const hr = async (req: Request, res: Response) => {
  return {
    on_board_users: (await orBoardRequest()).length,
    hr_letter_request: (await letterPendingRequest("hr")).length,
    hr_letter_request_list: await letterRequest("hr"),
    available_users: await getAvailableUsers(),
  };
};

export const user = async (req: Request, res: Response) => {
  return {
    pending_task: (await onUserGoingTaskList(req, res, "pending")).length,
    completed_task: (await onUserGoingTaskList(req, res, "completed")).length,
    on_going_task_list: await onUserGoingTaskList(req, res, "pending"),
    leave_request: (await userPendingleaveRequest(req, res)).length,
    on_going__leave_request_list: await userleaveRequest(req, res),
  };
};
