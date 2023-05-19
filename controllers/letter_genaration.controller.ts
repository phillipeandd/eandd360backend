import Express, { Request, Response, NextFunction } from "express";
import * as letter_genaration from "../services/letter_genaration.services";

export const getLeaves = async (req: Request, res: Response) => {
  letter_genaration
    .getLeaves(req, res)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.send(err));
};

export const getLeavesByRole = async (req: Request, res: Response) => {
  letter_genaration
    .getLeavesByRole(req, res)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.send(err));
};

export const getLetters = async (req: Request, res: Response) => {
  letter_genaration
    .getLetters(req, res)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.send(err));
};

export const getLettersByempId = async (req: Request, res: Response) => {
  letter_genaration
    .getLettersByempId(req, res)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.send(err));
};

export const getComAdvSug = async (req: Request, res: Response) => {
  letter_genaration
    .getComAdvSug(req, res)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.send(err));
};

export const postComAdvSug = async (req: Request, res: Response) => {
  letter_genaration
    .postComAdvSug(req, res)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.send(err));
};

export const getComAdvSugById = async (req: Request, res: Response) => {
  letter_genaration
    .getComAdvSugById(req, res)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.send(err));
};

export const getLeavesByid = async (req: Request, res: Response) => {
  letter_genaration
    .getLeavesByid(req, res)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.send(err));
};

export const postLeaves = async (req: Request, res: Response) => {
  letter_genaration
    .postLeaves(req, res)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.send(err));
};

export const createLetters = async (req: Request, res: Response) => {
  letter_genaration
    .createLetters(req, res)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.send(err));
};

export const putLeaves = async (req: Request, res: Response) => {
  letter_genaration
    .putLeaves(req, res)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.send(err));
};

// export const postComAdvSugReply = async (req: Request, res: Response) => {
//   letter_genaration
//     .postComAdvSugReply(req, res)
//     .then((data) => res.status(200).send(data))
//     .catch((err) => res.send(err));
// };
export const postComAdvSugReply = async (req: Request, res: Response) => {
 try{
  const complaint_reply= await letter_genaration.postComAdvSugReply(req,res);
  res.status(200).json(complaint_reply);
  return;
}catch(error:any){
  res.status(400).json({error,message:error.message});
  return;
}
};
