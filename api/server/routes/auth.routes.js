import express from 'express'
import authCtrl from '../controllers/auth.controller.js'
import User from "../models/user.model.js";
const router = express.Router()

router.route('/auth/signin').post(authCtrl.signin)
router.route('/auth/signout').get(authCtrl.signout)
router.put("/auth/reset-password", async (req, res) => {
    try {
      const { email } = req.body;
  
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }
  
      user.password = "123456789"; 
  
      await user.save();
  
      res.json({ message: "Password has been reset to 123456789." });
    } catch (err) {
      console.error("Reset password error:", err);
      res.status(500).json({ error: "Internal server error." });
    }
  });
 

export default router
