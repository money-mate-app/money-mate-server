import { Router } from "express";
import { getOtp, sendOtp, verifyOtp } from "./email.controller";
import { validate } from "../../middlewares";
import { getOtpReq, sendOtpReq, verifyOtpReq } from "./validator";

const router = Router();

router.post("/otp", validate(sendOtpReq), sendOtp);
router.get("/otp/:email", validate(getOtpReq), getOtp);
router.post("/otp/verify", validate(verifyOtpReq), verifyOtp);

export default router;
