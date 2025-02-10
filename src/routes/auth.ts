// src/routes/auth.ts
import { Router, Request } from 'express';
import { login } from '../controllers/authController';
import verifyToken from '../middlewares/auth';

interface AuthRequest extends Request {
  user?: any;
}

const router: Router = Router();

// Login route
router.post('/login', login);

router.get('/protected', verifyToken, (req: AuthRequest, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});
// Protected route example

export default router;
