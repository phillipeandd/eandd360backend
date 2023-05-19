import { PrismaClient } from "@prisma/client";
import { env } from "process";
const prisma = new PrismaClient();
import * as TasksService from "../services/tasks.service";

export async function getTaskDetails(req: any, res: any) {
  await prisma.task
    .upsert({
      where: {
        id: parseInt(req.params.Id),
      },
      update: {
        title: req.body.title,
        description: req.body.description,
        attachment: req.file?.filename || req.body.attachment,
        team: req.body.team,
        priority: req.body.priority,
        employee_id: req.body.employee_id,
        start_date: new Date(req.body.start_date),
        end_date: new Date(req.body.end_date),
      },
      create: {
        created_by: req.body.created_by,
        title: req.body.title,
        description: req.body.description,
        attachment: req.file?.filename || req.body.attachment,
        team: req.body.team,
        status: "pending",
        priority: req.body.priority,
        employee_id: req.body.employee_id,
        start_date: new Date(req.body.start_date),
        end_date: new Date(req.body.end_date),
      },
    })
    .then((data: any) => {
      res.statusCode = 200;
      res.send({ data, message: env.MESSAGE_SUCCESS });
    })
    .catch((error: any) => {
      console.info(error.message);
      console.info(error);
      res.statusCode = 300;
      res.send({ message: env.MESSAGE_FAILED });
    });
}

export const getDetailsById = async (req: any, res: any) => {
  await prisma.task
    .findMany({
      where: {
        employee_id: req.params.empId,
      },

      orderBy: [
        {
          status: "asc",
        },
        {
          created_at: "desc",
        },
      ],
      include: {
        employee: {
          select: {
            username: true,
            passport_size_photo: true,
          },
        },
        creator: {
          select: {
            username: true,
            passport_size_photo: true,
          },
        },
      },
    })
    .then((data: any) => {
      res.statusCode = 200;
      res.send({ data, message: env.MESSAGE_SUCCESS });
    })
    .catch((error: any) => {
      console.info(error.message);
      console.info(error);
      res.statusCode = 300;
      res.send({ message: env.MESSAGE_FAILED });
    });
};

export const getTaskList = async (req: any, res: any) => {
  try {
    const taskList = await TasksService.getTasks();
    res.status(200).json({ data: taskList, message: env.MESSAGE_SUCCESS });
    return;
  } catch (error: any) {
    console.error("Error Message - ", error.message);
    res.status(400).json({ message: env.MESSAGE_FAILED });
    return;
  }
};

export const deleteDetailsById = async (req: any, res: any) => {
  await prisma.task
    .delete({
      where: {
        id: parseInt(req.params.Id),
      },
    })
    .then((data: any) => {
      res.statusCode = 200;
      res.send({ data, message: env.MESSAGE_SUCCESS });
    })
    .catch((error: any) => {
      res.statusCode = 300;
      res.send({ message: env.MESSAGE_FAILED });
    });
};

export const updateTaskStatusByID = async (req: any, res: any) => {
  await prisma.task
    .update({
      where: {
        id: parseInt(req.params.Id),
      },
      data: { status: req.body.status },
    })
    .then((data: any) => {
      res.statusCode = 200;
      res.send({ data, message: env.MESSAGE_SUCCESS });
    })
    .catch((error: any) => {
      res.statusCode = 300;
      res.send({ message: env.MESSAGE_FAILED });
    });
};

export const getPendingTaskById  = async (req: any, res: any) => {
  await prisma.task
    .findMany({
      where: {
        AND:[
          {
          employee_id: req.params.Id,
         
        },{ status: 'pending'}]
      },

      orderBy: [
        {
          status: "asc",
        },
        {
          created_at: "desc",
        },
      ],
      include: {
        employee: {
          select: {
            username: true,
            passport_size_photo: true,
          },
        },
        creator: {
          select: {
            username: true,
            passport_size_photo: true,
          },
        },
      },
    })
    .then((data: any) => {
      res.statusCode = 200;
      res.send({ data, message: env.MESSAGE_SUCCESS });
    })
    .catch((error: any) => {
      console.info(error.message);
      console.info(error);
      res.statusCode = 300;
      res.send({ message: env.MESSAGE_FAILED });
    });
};