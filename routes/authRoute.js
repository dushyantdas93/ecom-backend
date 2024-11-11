import express from "express";
import {
    getAllController,
  getUserController,
  loginController,
  registerController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/getAll", getAllController);
router.get("/getUser/:id", getUserController);
router.get("/test",requireSignIn,isAdmin, (req, res) => {
  res.send("protected router");
});

export default router;
