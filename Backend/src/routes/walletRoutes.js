import express from "express";
import {
  createWallet,
  deleteWallet,
  getWallets,
  updateWallet,
  getWalletsByUser,
} from "../controllers/walletController.js";
import isAuth from "../middlewares/isAuth.js";
import isAdmin from "../middlewares/isAdmin.js";

const router = express.Router();

router.get("/wallets", isAuth, getWallets);
router.post("/wallet", isAuth, createWallet);

router.get("/wallets", isAdmin, getWalletsByUser);
router.post("/wallet", isAdmin, createWallet);
router.patch("/wallet/:id", isAdmin, updateWallet);
router.delete("/wallet/:id", isAdmin, deleteWallet);

export default router;
