import { Router } from 'express';
import { check } from 'express-validator';
import { addMessage } from '../../controllers/message';
import auth from '../../middlewares/auth';
const router = Router();

//route POST /api/message
//@desc send message
//access Public
router.get(
  '/message/:username',
  [check('text', 'Please add a message').not().isEmpty()],
  addMessage
);

export default router;
