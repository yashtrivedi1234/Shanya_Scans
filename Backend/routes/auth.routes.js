import express from "express";
import { sendOtp, verifyOtp } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/login", sendOtp);
router.post("/verify", verifyOtp);

export default router;
