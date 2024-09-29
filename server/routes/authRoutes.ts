import { Router } from 'express';
import { registerUser, loginUser, fetchUserSkills } from '../controllers/authController';

const router = Router();

// Route for user registration
router.post('/register', registerUser);

// Route for user login
router.post('/login', loginUser);

router.get('/skills/:username', fetchUserSkills); // Add route for fetching user skills


export default router;
