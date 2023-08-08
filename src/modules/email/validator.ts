import { z } from "zod";

export const sendOtpReq = z.object({
    body: z.object({
        email: z
            .string({
                required_error: "Please provide an email",
            })
            .email("Please provide a valid email"),
    }),
});

export const verifyOtpReq = z.object({
    body: z.object({
        email: z
            .string({
                required_error: "Please provide an email",
            })
            .email("Please provide a valid email"),
        otp: z
            .string({
                required_error: "Please provide an otp",
            })
            .min(6, "Please provide a valid otp")
            .regex(/^\d+$/, "Please enter a valid otp"),
    }),
});

export const getOtpReq = z.object({
    params: z.object({
        email: z
            .string({
                required_error: "Please provide an email",
            })
            .email("Please provide a valid email"),
    }),
});

export type SendOtpReq = z.infer<typeof sendOtpReq>;
export type VerifyOtpReq = z.infer<typeof verifyOtpReq>;
export type GetOtpReq = z.infer<typeof getOtpReq>;
