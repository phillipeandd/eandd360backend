import Express, { Request, Response, NextFunction } from "express";
import * as exitsServices from "../services/exits.services";

export const resignationData = async (req: Request, res: Response) => {
  await exitsServices
    .employee_resignation(req, res)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
};

export const createResignationData = async (req: Request, res: Response) => {
  await exitsServices
    .createData(req, res)
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
};

export const updateResignationData = async (req: Request, res: Response) => {
  await exitsServices
    .updateData(req, res)
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
};

export const resignationDataById = async (req: Request, res: Response) => {
  await exitsServices
    .dataByid(req, res)
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
};

export const feedBackForm = async (req: Request, res: Response) => {
  await exitsServices
    .createfeedBackForm(req, res)
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
};

export const feebBackByid = async (req: Request, res: Response) => {
  await exitsServices
    .feebBackDataByid(req, res)
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
};

export const checkList = async (req: Request, res: Response) => {
  await exitsServices
    .getCheckList(req, res)
    .then((data) => res.json(data))
    .catch((err) => res.send(err));
};

export const createCheckList = async (req: Request, res: Response) => {
  await exitsServices
    .createCheckList(req, res)
    .then((data) => res.json(data))
    .catch((err) => res.send(err));
};
export const getcheckListById = async (req: Request, res: Response) => {
  await exitsServices
    .getById(req, res)
    .then((data) => res.json(data))
    .catch((err) => res.send(err));
};
