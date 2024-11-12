import express from "express";
import {
  forgotPasswordController,
  getAllController,
  getUserController,
  loginController,
  registerController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/forgot-password", forgotPasswordController);

router.get("/getAll", getAllController);
router.get("/getUser/:id", getUserController);
router.get("/dashboard", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
router.get("/dashboard/admin", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

router.get("/test", (req, res) => {
  res.send("protected router");
});

export default router;
