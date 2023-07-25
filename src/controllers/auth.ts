import { NextFunction, Response } from "express";

export function login(req: any, res: Response, next: NextFunction) {
  try {
  } catch (err: any) {
    if (!err.status) err.status = 500;
    next(err);
  }
}
