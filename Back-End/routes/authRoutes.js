import express from "express";
const router = express.Router();

import {
  register,
  login,
  updateUser,
  getAllUsers,
} from "../controllers/authController.js";
import authenticateUser from "../middleware/auth.js";

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/updateUser").patch(authenticateUser, updateUser);
router.route("/getAllUsers").get(getAllUsers);

export default router;
