import express from "express"
import { loginController, registerController } from "../controllers/authController.js"
import { requireSignIn } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/register", registerController)
router.post("/login", loginController)
router.get("/text",requireSignIn, (req, res) => {
    res.send({message:"protected router"})
})

export default router