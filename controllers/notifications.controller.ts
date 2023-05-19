import Express, { Request, Response, NextFunction } from "express";
import * as notifications from "../services/notifications.service";
export const getNotifications = (req: Request, res: Response) => {
  notifications
    .get(req, res)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => res.status(500).json(error));
};

export const getNotificationsById = (req: Request, res: Response) => {
  notifications
    .getById(req, res)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => res.status(500).json(error));
};

export const postNotifications = (req: Request, res: Response) => {
  notifications
    .postData(req, res)
    .then((data) => {
      res.status(200).json(data);
      console.log(data);
    })
    .catch((error) => res.status(500).json(error));
};
