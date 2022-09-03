import { Router } from 'express';
import { check } from 'express-validator';
import { loginUser, getUser } from '../../controllers/user';
import auth from '../../middlewares/auth';
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

//route GET /api/auth
//@desc get user
//access Private
router.get('/auth', auth, getUser);

export default router;
