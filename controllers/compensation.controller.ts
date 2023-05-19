import Express, { Request, Response, NextFunction } from "express";
import * as compensation from "../services/compensation.service";
export const create = async (req: Request, res: any) => {
  try {
    compensation
      .createData(req, res)
      .then((data) => res.json(data))
      .catch((err) => res.send(err));
  } catch (e: any) {
    console.error(e);
    return res.status(400).json({ status: 400, message: e.message });
  }
};

export const getDate = async (req: Request, res: any) => {
  try {
    compensation
      .getDate(req, res)
      .then((data) => res.json(data))
      .catch((err) => res.send(err));
  } catch (e: any) {
    console.error(e);
    return res.status(400).json({ status: 400, message: e.message });
  }
};
