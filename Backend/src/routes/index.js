import express from "express";

import authRouter from "./authRoutes.js";
import userRouter from "./userRoutes.js";
import walletRouter from "./walletRoutes.js";
import transactionRouter from "./transactionRoutes.js";

const router = express.Router();

router.use(authRouter, userRouter, walletRouter, transactionRouter);

export default router;
