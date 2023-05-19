import exp from "constants";
import Express, { Request, Response, NextFunction } from "express";
import { resolve } from "path";
import prisma from "../utils/prisma";

export const getUserEvents = async (
  userId: string,
  { start, end }: { start: string; end: string }
) => {
  try {
    const eventsCreated = await prisma.events.findMany({
      where: {
        created_by: userId,
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
            attendee_id: true,
          },
        },
      },
    });

    const attendingEvents = await prisma.events.findMany({
      where: {
        event_attendees: {
          some: {
            attendee_id: userId,
          },
        },
      },
      include: {
        event_attendees: {
          select: {
            attendee_id: true,
          },
        },
      },
    });
    return [...eventsCreated, ...attendingEvents];
  } catch (error) {
    throw Error("Error While Getting User Events");
  }
};

export const createEvent = async (
  userId: string,
  { start, end, attendees, title, description, isAllDay }: any
) => {
  let attendeesInput =
    attendees == undefined
      ? []
      : attendees.filter((attendee: string) => {
          return attendee !== userId;
        });
  let attendeesData = [...attendeesInput].map((attendee: string) => ({
    attendee_id: attendee,
  }));

  try {
    const event = await prisma.events.create({
      data: {
        kind: "kind#appointment",
        description,
        title,
        created_by: userId,
        start: new Date(start),
        end: new Date(end),
        event_attendees: {
          createMany: {
            data: attendeesData,
          },
        },
      },
    });
    return event;
  } catch (error: any) {
    console.error(error);
    throw Error("Error While Create New Event");
  }
};

export const getUserEvent = async (userId: string, eventId: string) => {
  try {
    const event = await prisma.events.findUnique({
      where: {
        event_id: eventId,
      },
      include: {
        event_attendees: true,
      },
    });
    return event;
  } catch (e) {
    throw Error("Error While Getting User Event");
  }
};

export const updateEvent = async (
  userId: string,
  eventId: string,
  {
    start,
    end,
    attendees,
    title,
    description,
    isAllDay,
  }: {
    start: any;
    end: any;
    attendees: any;
    title: any;
    description: any;
    isAllDay: any;
  }
) => {
  let attendeesInput =
    attendees == undefined
      ? []
      : attendees.filter((attendee: string) => {
          return attendee !== userId;
        });
  let attendeesData = [...attendeesInput].map((attendee: string) => ({
    attendee_id: attendee,
  }));

  try {
    const event = await prisma.events.update({
      where: {
        event_id: eventId,
      },
      data: {
        kind: "kind#appointment",
        description,
        title,
        created_by: userId,
        start: new Date(start),
        end: new Date(end),
        event_attendees: {
          deleteMany: {
            event_id: eventId,
          },
          createMany: {
            data: attendeesData,
          },
        },
      },
    });

    return event;
  } catch (error: any) {
    throw Error("Error While getting Attending Event");
  }
};

export const getAttendingEvents = async (userId: string) => {
  try {
    const events = await prisma.events.findMany({
      where: {
        event_attendees: {
          some: {
            attendee_id: userId,
          },
        },
      },
      include: {
        event_attendees: {
          select: {
            attendee_id: true,
          },
        },
      },
    });
    return events;
  } catch (error) {
    throw Error("Error While Getting Attending Events");
  }
};

export const deleteEvent = async (eventId: string, userId: string) => {
  // TODO: check if the user is authroised to delete the event.
  try {
    const event = await prisma.events.delete({
      where: {
        event_id: eventId,
      },
    });
    return event;
  } catch (e: any) {
    throw Error("Error While Deleting Event");
  }
};
