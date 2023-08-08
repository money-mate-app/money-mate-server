import { NextFunction, Response } from "express";
import logger from "../../utils/logger";

export function login(req: any, res: Response, next: NextFunction) {
    try {
        logger.debug("This is Login Controller");
        next({
            message: "Success",
            data: "Zaid",
        });
    } catch (err: any) {
        if (!err.status) err.status = 500;
        next(err);
    }
}
