import express from 'express';
import { verifyToken, requireRole } from '../middleware/auth.js';
import { getAllUsers, updateUserRole, createAdmin, getAllItems } from '../controllers/admin.controller.js';

const router = express.Router();

router.use(verifyToken, requireRole('admin'));

router.get('/users', getAllUsers);
router.put('/users/role', updateUserRole);
router.post('/create-admin', createAdmin);
router.get('/items', getAllItems);

export default router;