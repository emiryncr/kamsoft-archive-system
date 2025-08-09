import express from 'express';
import { login, signup, getAllUsers } from '../controllers/auth.controller.js';
import { signupValidationRules } from '../middleware/validators/authValidator.js';
import validate from '../middleware/validators/validate.js';

const router = express.Router();

router.post('/signup', signupValidationRules, validate, signup);
router.post('/login', login); 
router.get('/users', getAllUsers);

export default router;