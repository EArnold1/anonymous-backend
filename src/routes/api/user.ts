import { Router } from 'express';
import { check } from 'express-validator';
import { registerUser } from '../../controllers/user';
const router = Router();

//route POST /api/user
//@desc register user
//access Public
router.post(
  '/user',
  [
    check('username', 'Invalid username').not().isEmpty(),
    check('password', 'Password too short').isLength({ min: 6 }),
    check('email', 'Invalid email').isEmail(),
  ],
  registerUser
);

export default router;
