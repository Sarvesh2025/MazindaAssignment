import express from "express";
import { createTransaction,updateTransaction,deleteTransaction,getTransactionHistory } from "../controllers/transactionController.js";
import isAuth from "../middlewares/isAuth.js";

const router = express.Router();

router.post("/transaction", isAuth, createTransaction); //tested 
router.patch("/trasaction/:id", isAuth, updateTransaction);
router.get("/transactionhistory", isAuth, getTransactionHistory);
router.delete("/transaction/:id", isAuth, deleteTransaction);

export default router;
