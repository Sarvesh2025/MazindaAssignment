import express from "express";
import {
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
  toggleActivateStatus,
} from "../controllers/userController.js";
import isAuth from "../middlewares/isAuth.js";
import isAdmin from "../middlewares/isAdmin.js";

const router = express.Router();

router.get("/user/:id", isAuth, getUserById);
router.patch("/user/:id", isAuth, updateUser);
router.delete("/user/:id", isAuth, deleteUser);

router.get("/users", isAdmin, getUsers);
router.patch("/users/toggle/:id", isAdmin, toggleActivateStatus);
router.delete("/user/:id", isAdmin, deleteUser);

export default router;
