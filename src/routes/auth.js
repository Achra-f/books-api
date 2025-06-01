import express from 'express';
import { validate } from '../middleware/validate.js';
import { signupSchema, loginSchema } from '../validators/authValidator.js';
import { signupController, loginController } from '../controllers/auth.js';

const router = express.Router();

router.post('/signup', validate(signupSchema), signupController);
router.post('/login', validate(loginSchema), loginController);

export default router;
