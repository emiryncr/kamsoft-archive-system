import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { getUserProfile, updateUserProfile, changePassword } from '../controllers/user.controller.js';

const router = express.Router();

router.use(verifyToken);

router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);
router.put('/change-password', changePassword);

export default router;