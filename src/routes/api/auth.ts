import { Router } from 'express';
import { check } from 'express-validator';
import { loginUser } from '../../controllers/user';
const router = Router();

//route POST /api/auth
//@desc login user
//access Public
router.post(
  '/auth',
  [
    check('username', 'Invalid username').not().isEmpty(),
    check('password', 'Password too short').isLength({ min: 6 }),
  ],
  loginUser
);

export default router;
