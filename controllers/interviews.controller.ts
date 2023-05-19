import Express, { Request, Response, NextFunction } from "express";
import prisma from "../utils/prisma";
import { addDays, format } from "date-fns";
import * as InterviewService from "../services/interview.service";

interface IEventRequest extends Request {
  params: { userId: string };
  query: {
    start: string;
    end: string;
  };
  body: {
    start?: string;
    end?: string;
    isAllDay?: boolean;
    title: string;
    description: string;
    status?: string;
    interview?: string;
    location?: string;
    phone?: string;
    response?: string;
    interview_status?: string;
    email?: string;
    name?: string;
  };
}

export const getHrInterviewEvents = async (
  req: IEventRequest,
  res: Response
) => {
  const { userId } = req.params;
  const {
    start = format(new Date(), "yyyy-MM-dd"),
    end = addDays(new Date(), 31).toString(),
  } = req.query;

  //TODO: check user role if HR
  /**
   *  validate inputs
   * check start date is before end date,
   *
   */

  try {
    const events = await InterviewService.getUserInterviews(userId, {
      start,
      end,
    });

    res.status(200).json(events);
    return;
  } catch (e: any) {
    console.error(e);
    return res.status(400).json({ status: 400, message: e.message });
  }
};

export const createInterviewEvent = async (
  req: IEventRequest,
  res: Response
) => {
  const { userId } = req.params;
  const {
    start,
    end,
    title,
    description,
    location,
    phone,
    interview_status,
    response,
    status,
    email,
    name,
  } = req.body;
  if (start == null || end == null) {
    res.status(400).json({ message: "start & end cannot be empty" });
    return;
  }
  try {
    const events = await InterviewService.createInterviewEvent(userId, {
      start,
      end,
      title,
      description,
      location,
      phone,
      interview_status,
      response,
      status,
      email,
      name,
    });
    res.status(201).json(events);
    return;
  } catch (e: any) {
    console.error(e);
    res.status(400).json(e);
    return;
  }
};

export const updateInterviewEvent = async (req: Request, res: Response) => {
  console.info("---");
  console.info("updateInterviewEvent");
  console.info("---");
  const { eventId } = req.params;
  const { userId } = req.params;
  const {
    start,
    end,
    title,
    description,
    interview_status,
    status,
    response,
    location,
    name,
    phone,
    email,
  } = req.body;

  if (start == null || end == null) {
    res.status(400).json({ message: "start & end cannot be empty" });
    return;
  }

  try {
    const event = await InterviewService.updateInterviewEvent(userId, eventId, {
      start,
      end,
      title,
      description,
      interview_status,
      status,
      response,
      location,
      name,
      phone,
      email,
    });
    res.status(200).json(event);
    return;
  } catch (error: any) {
    console.error(error);
    res.status(500).json(error);
    return;
  }
};
