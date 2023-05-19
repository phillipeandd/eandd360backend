const express = require("express");
import { PrismaClient } from "@prisma/client";
import { Request, response, Response } from "express";
const prisma = new PrismaClient();
// export const create = await (req, (res) => res.json("hii"));

export const createData = (req: Request, res: Response) => {
  return prisma.employee_compensation.create({
    data: {
      employee_id: req.body.employee_id,
      date_of_discussion: new Date(req.body.date_of_discussion),
      date_of_implementation: new Date(req.body.date_of_implementation),
      previous_ctc: req.body.previous_ctc || "",
      current_ctc: req.body.current_ctc,
      percentage: req.body.percentage,
    },
  });
};
export const getDate = (req: any, res: Response) => {
  return prisma.employee_compensation.findMany({
    where: { employee_id: req.params.empId },

    orderBy: {
      id: "desc",
    },
  });
};
