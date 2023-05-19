import { PrismaClient } from "@prisma/client";
import * as pmsService from "../services/pms.service";
import { Request, Response } from "express";
interface TypedRequest extends Request {
  params: {
    empId: string;
  };
  query: {
    date: string;
    doj?: string;
    year: string;
  };
}

export const createUserPms = async (req: Request, res: Response) => {
  const {
    userId,
    ownership,
    integrity,
    punctuality,
    feedback_positively,
    attitude_towards_others,
    attitude_towards_work,
    professional_development,
    problem_solving,
    created_by,
    month,
  } = req.body;
  try {
    const newUserPms = await pmsService.createUserPms(
      userId,
      ownership,
      punctuality,
      integrity,
      feedback_positively,
      attitude_towards_others,
      attitude_towards_work,
      professional_development,
      problem_solving,
      created_by,
      month
    );
    res.status(201).json(newUserPms);
    return;
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ error, message: error.message });
    return;
  }
};

export const getUserPms = async (req: TypedRequest, res: Response) => {
  const { empId } = req.params;
  const { date } = req.query;
  try {
    const userPms = await pmsService.getUserPms(empId, date);
    res.status(201).json(userPms);
    return;
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ error, message: error.message });
    return;
  }
};
export const getUserPmsByYear = async (req: TypedRequest, res: Response) => {
  const { empId } = req.params;
  const { year } = req.query;
  try {
    const userPms = await pmsService.getUserPmsByYear(empId, year);
    res.status(201).json(userPms);
    return;
  } catch (error: any) {
    res.status(400).json({ error, message: error.message });
    return;
  }
};
export const getAllPms = async (req: TypedRequest, res: Response) => {
  const { empId } = req.params;
  const { date } = req.query;
  try {
    const userPms = await pmsService.getAllPms(empId, date);
    res.status(201).json(userPms);
    return;
  } catch (error: any) {
    res.status(400).json({ error, message: error.message });
    return;
  }
};
export const getAllPmsByYear = async (req: TypedRequest, res: Response) => {
  const { empId } = req.params;
  const { year } = req.query;
  try {
    const userPms = await pmsService.getAllPmsByYear(empId, year);
    res.status(201).json(userPms);
    return;
  } catch (error: any) {
    res.status(400).json({ error, message: error.message });
    return;
  }
};

export const getAdminPms = async (req: TypedRequest, res: Response) => {
  const { empId } = req.params;
  const { date } = req.query;
  try {
    const adminPms = await pmsService.getAdminPms(empId, date);
    res.status(201).json(adminPms);
    return;
  } catch (error: any) {
    res.status(400).json({ error, message: error.message });
    return;
  }
};
