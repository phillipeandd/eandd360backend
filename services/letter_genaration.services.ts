const express = require("express");
const app = express();
import { PrismaClient } from "@prisma/client";
import { Request, response, Response } from "express";
const prisma = new PrismaClient();
export const getLeaves = async (req: Request, res: Response) => {
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
  });
};

export const getLeavesByRole = async (req: Request, res: Response) => {
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
    where: { OR: [{ to: req.params.role }, { to: "both" }] },
  });
};

export const getLetters = async (req: Request, res: Response) => {
  return await prisma.employee_letters.findMany({
    where: {
      letter_type: req.body.type,
    },
    orderBy: {
      created_at: "desc",
    },
    include: {
      name: {
        select: {
          username: true,
          passport_size_photo: true,
        },
      },
    },
  });
};

export const getLettersByempId = async (req: Request, res: Response) => {
  return await prisma.employee_letters.findMany({
    orderBy: {
      id: "desc",
    },
    where: {
      employee_id: req.params.empId,
    },
  });
};

export const createLetters = async (req: any, res: any) => {
  return await prisma.employee_letters.create({
    data: {
      employee_id: req.body.employee_id,
      letter_type: req.body.letter_type,
      letter: req.file.filename,
    },
  });
};

export const getComAdvSug = async (req: Request, res: Response) => {
  return await prisma.employee_complants_advices_suggestions.findMany({
    include: {
      employee: {
        select: {
          username: true,
          passport_size_photo: true,
        },
      },
    },
  });
};

export const getComAdvSugById = async (req: Request, res: Response) => {
  return await prisma.employee_complants_advices_suggestions.findMany({
    orderBy: {
      id: "desc",
    },
    where: {
      employee_id: req.params.empId,
    },
  });
};

export const postComAdvSug = async (req: Request, res: Response) => {
  return await prisma.employee_complants_advices_suggestions.create({
    data: {
      employee_id: req.body.employee_id,
      message: req.body.message,
      reply_admin: req.body.reply_admin,
      status: req.body.status || "pending",
      letter_type: req.body.letter_type,
    },
  });
};

export const getLeavesByid = async (req: Request, res: Response) => {
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
      employee_id: req.params.empId,
    },
  });
};

export const postLeaves = async (req: Request, res: Response) => {
  return await prisma.employee_leaves.create({
    data: {
      employee_id: req.body.employee_id,
      leave_status: "pending",
      leave_dates: String(req.body.leavesdates),
      reason: req.body.reason,
      permission_type: req.body.permission_type,
      from: req.body.from,
      to: req.body.to,
    },
  });
};

export const putLeaves = async (req: Request, res: Response) => {
  return await prisma.employee_leaves.update({
    where: {
      id: parseInt(req.params.Id),
    },
    data: {
      leave_status: req.body.leave_status,
    },
  });
};

export const postComAdvSugReply = async (req: Request, res: Response) => {
  // const id=parseInt(req.params.Id);
  // const reply_admin= req.body.reply_admin;
  return await prisma.employee_complants_advices_suggestions.update({
    where: {
      id: parseInt(req.params.Id),
    },
    data: {
      reply_admin: req.body.reply_admin,
      status: req.body.status || "resloved",
    },
  });
};
