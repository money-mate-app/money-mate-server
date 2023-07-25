import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";

export function authenticate (req: Request, res: Response, next: NextFunction) {
    try {
        const bearerToken = req.headers.authorization;
        if (!bearerToken) {
            return createHttpError.Unauthorized("Please provide access token")
        }

    } catch (err) {

    }
}