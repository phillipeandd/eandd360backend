const express = require("express");
const app = express();
import { PrismaClient } from "@prisma/client";
import { Request, response, Response } from "express";
const prisma = new PrismaClient();
export const employee_resignation = async (req: Request, res: Response) => {
  return await prisma.employee_resignation.findMany({});
};
export const createData = async (req: Request, res: Response) => {
  return await prisma.employee_resignation.create({
    data: {
      employee_id: req.body.employee_id,
      reason: req.body.reason,
      start_date: new Date(req.body.start_date),
      end_date: new Date(req.body.end_date),
      status: req.body.status || "pending",
      created_at: new Date(req.body.created_at),
      send_feedback_form: "pending",
      send_check_list: "pending",
    },
  });
};

export const updateData = async (req: Request, res: Response) => {
  return await dataByid(req, res).then(async (response) => {
    return await prisma.employee_resignation.update({
      where: {
        employee_id: req.params.empId,
      },
      data: {
        status: req.body.status || response[0].status,
        send_check_list:
          req.body.send_check_list || response[0].send_check_list,
        send_feedback_form:
          req.body.send_feedback_form || response[0].send_feedback_form,
      },
    });
  });
};

export const dataByid = async (req: Request, res: Response) => {
  return await prisma.employee_resignation.findMany({
    where: { employee_id: req.params.empId },
  });
};

export const createfeedBackForm = async (req: Request, res: Response) => {
  return await prisma.feedback.create({
    data: {
      employee_id: req.body.employee_id,
      fed_question_1: req.body.fed_question_1,
      fed_question_2: req.body.fed_question_2,
      fed_question_3: req.body.fed_question_3,
      fed_question_4: req.body.fed_question_4,
      fed_question_5: req.body.fed_question_5,
      fed_question_6: req.body.fed_question_6,
      fed_question_7: req.body.fed_question_7,
      fed_question_8: req.body.fed_question_8,
      fed_question_9: req.body.fed_question_9,
      fed_question_10: req.body.fed_question_10,
      fed_question_11: req.body.fed_question_11,
      status: req.body.status || "pending",
      created_at: new Date(),
    },
  });
};

export const feebBackDataByid = async (req: Request, res: Response) => {
  return await prisma.feedback.findFirst({
    where: { employee_id: req.params.empId },
  });
};

export const getCheckList = async (req: Request, res: Response) => {
  return await prisma.checklists.findMany({});
};

export const getById = async (req: Request, res: Response) => {
  return await prisma.checklists.findFirst({
    where: { employee_id: req.params.empId },
  });
};

export const createCheckList = async (req: Request, res: Response) => {
  return await prisma.checklists.create({
    data: {
      employee_id: req.body.employee_id,
      id_card: req.body.id_card || false,
      cell_phone: req.body.cell_phone || false,
      laptop: req.body.laptop || false,
      files: req.body.files || false,
      key_s: req.body.key_s || false,
      check_status: "completed",
    },
  });
};
