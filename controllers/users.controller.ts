import Express, { Request, Response, NextFunction } from "express";
import * as usersService from "../services/users.service";

export const getUsers = async (req: Request, res: Response) => {
  usersService
    .getAllUsers(req, res)
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
};

export const getAllUsers = async (req: Request, res: Response) => {
  usersService
    .getAllUsersData(req, res)
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
};

export const getUsersLoginDetails = async (req: any, res: any) => {
  console.log("users login");
  usersService
    .getUsersLoginDetails(req, res)
    .then((data) => {
      if (data) {
        res.send({ ...data, status: 200 });
      } else {
        res.json({ message: "Invalid login details" });
      }
    })
    .catch((err) => res.send(err));
};

export const getUsersByempId = async (req: Request, res: Response) => {
  usersService
    .getUsersByempId(req, res)
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
};

export const updateUsersById = async (req: Request, res: Response) => {
  usersService
    .updateUsersById(req, res)
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
};

export const getUsersById = async (req: any, res: any) => {
  usersService
    .getUsersById(req, res)
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
};

export const createUser = async (req: Request, res: Response) => {
  usersService.createUser(req, res);
};

export const updateUser = async (req: Request, res: Response) => {
  usersService
    .updateUser(req, res)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
  // res.json("hii");
};
export const getAdminData = async (req: Request, res: Response) => {
  // return res.json("hi");
  usersService
    .getAdminData(req, res)
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
};

