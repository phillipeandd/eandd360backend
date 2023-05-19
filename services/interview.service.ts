import prisma from "../utils/prisma";
import { addDays, format } from "date-fns";

export const getUserInterviews = async (
  userId: string,
  { start, end }: { start: string; end: string }
) => {
  try {
    const interviewEvents = await prisma.events.findMany({
      where: {
        created_by: userId,
        kind: "kind#interview",
        start: {
          gte: new Date(start),
        },
        end: {
          lte: new Date(end),
        },
      },
      include: {
        event_attendees: {
          select: {
            email: true,
            name: true,
            location: true,
            phone: true,
            response: true,
          },
        },
      },
    });

    const events = interviewEvents.map((event) => ({
      id: event.event_id,
      event_id: event.event_id,
      created_by: event.created_by,
      title: event.title,
      description: event.description,
      start: event.start,
      end: event.end,
      status: event.status,
      interview_status: event.interview_status,
      kind: event.kind,
      name: event.event_attendees[0]?.name,
      email: event.event_attendees[0]?.email,
      phone: event.event_attendees[0]?.phone,
      location: event.event_attendees[0]?.location,
      response: event.event_attendees[0]?.response,
    }));
    return events;
  } catch (e: any) {
    console.error(e);
    throw Error("Error While Getting User Interviews");
  }
};

export const createInterviewEvent = async (
  userId: string,
  {
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
  }: {
    start: string;
    end: string;
    title: string;
    description: string;
    location: string | undefined;
    phone: string | undefined;
    interview_status: string | undefined;
    response: string | undefined;
    status: string | undefined;
    email: string | undefined;
    name: string | undefined;
  }
) => {
  try {
    const interviewEvent = await prisma.events.create({
      data: {
        kind: "kind#interview",
        description,
        title,
        status,
        interview_status,
        created_by: userId,
        start: new Date(start),
        end: new Date(end),
        event_attendees: {
          create: {
            location,
            phone,
            name,
            response,
            email,
          },
        },
      },
      include: {
        event_attendees: true,
      },
    });
    return interviewEvent;
  } catch (e: any) {
    console.error(e);
    throw Error("Error While Getting User Interviews");
  }
};

export const updateInterviewEvent = async (
  userId: string,
  eventId: string,
  {
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
  }: any
) => {
  try {
    const event = await prisma.events.update({
      where: {
        event_id: eventId,
      },
      data: {
        description,
        title,
        start: new Date(start),
        end: new Date(end),
        status,
        interview_status,
        event_attendees: {
          deleteMany: {
            event_id: eventId,
          },
          create: {
            email,
            location,
            name,
            phone,
            response,
          },
        },
      },
      include: {
        event_attendees: {
          select: {
            email: true,
            phone: true,
            response: true,
            location: true,
            name: true,
          },
        },
      },
    });
    return event;
  } catch (error: any) {
    console.error(error);
    throw Error("Error While Updating Interview Event");
  }
};
