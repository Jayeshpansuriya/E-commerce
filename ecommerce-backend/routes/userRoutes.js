import express from "express";
import { registerUser, loginUser ,updateUserProfile} from "../controllers/userController.js";
import protect from "../middlewares/authMiddleware.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();
// @route   GET /api/users/profile
router.get("/profile", protect, (req, res) => {
    res.status(200).json({
        message: "profile fetched successfully",
        user: req.user
    });
});
router.put('/profile',verifyToken,updateUserProfile);
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
