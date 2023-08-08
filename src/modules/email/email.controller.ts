import { getOtpCacheKey } from "./cache";
import { NextFunction, Response } from "express";
import { GetOtpReq, SendOtpReq, VerifyOtpReq } from "./validator";
import { generateOtp } from "../../utils/helpers";
import { getCache, setCache } from "../../utils/cache";
import sendEmail from "../../services/email/transport";
import logger from "../../utils/logger";
import createHttpError from "http-errors";

export async function sendOtp(
    req: SendOtpReq,
    res: Response,
    next: NextFunction,
) {
    try {
        const { email } = req.body;
        const cacheKey = getOtpCacheKey(email);
        let otp = await getCache(cacheKey);
        if (!otp) {
            otp = generateOtp();
            setCache(cacheKey, otp, 300);
        }
        const response = await sendEmail(email, otp);
        next({
            message: "OTP sent successfully to " + email,
        });
    } catch (err: any) {
        if (!err.status) err.status = 500;
        next(err);
    }
}

export async function verifyOtp(
    req: VerifyOtpReq,
    res: Response,
    next: NextFunction,
) {
    try {
        const { email, otp } = req.body;
        const cacheKey = getOtpCacheKey(email);
        let cacheOtp = await getCache(cacheKey);
        if (!cacheOtp || cacheOtp !== otp) {
            throw createHttpError.Unauthorized(
                "Invalid OTP. Please provide a valid OTP",
            );
        }

        next({
            data: {
                verified: true,
            },
            message: "Email verification was successful",
        });
    } catch (err: any) {
        if (!err.status) err.status = 500;
        next(err);
    }
}

export async function getOtp(
    req: GetOtpReq,
    res: Response,
    next: NextFunction,
) {
    try {
        const { email } = req.params;
        const cacheKey = getOtpCacheKey(email);
        let otp = await getCache(cacheKey);
        if (!otp) {
            next({
                data: null,
                message: `Otp not found for ${email}`,
            });
        }
        next({
            data: { otp },
            message: `Otp found for ${email}`,
        });
    } catch (err: any) {
        if (!err.status) err.status = 500;
        next(err);
    }
}
