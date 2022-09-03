import { Router } from 'express';
import { check } from 'express-validator';
import { findUser, registerUser } from '../../controllers/user';
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

//route GET /api/user/:username
//@desc find user
//access Public
router.get('/user/:username', findUser);

export default router;
