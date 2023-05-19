import Express, { Request, Response, NextFunction } from "express";
import * as dashboard from "../services/dashboard.service";
export const admin = async (req: Request, res: Response) => {
  dashboard
    .admin(req, res)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
};

export const hr = async (req: Request, res: Response) => {
  dashboard
    .hr(req, res)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
};

export const user = async (req: Request, res: Response) => {
  dashboard
    .user(req, res)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
};

// export const getUserEvents = async (req: IEventRequest, res: Response) => {
//     const { userId } = req.params;
//     const { start, end } = req.query;
//     try {
//       const events = await EventService.getUserEvents(userId, { start, end });
//       return res.status(200).json(events);
//     } catch (e: any) {
//       return res.status(400).json({ status: 400, message: e.message });
//     }
//   };
