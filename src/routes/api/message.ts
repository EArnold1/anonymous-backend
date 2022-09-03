import { Router } from 'express';
import { check } from 'express-validator';
import { addMessage, getMessages } from '../../controllers/message';
import auth from '../../middlewares/auth';
const router = Router();

//route POST /api/message/:username
//@desc send message
//access Public
router.post(
  '/message/:username',
  [check('text', 'Please add a message').not().isEmpty()],
  addMessage
);

//route GET /api/message
//@desc get messages
//access Private
router.get('/messages', auth, getMessages);

export default router;
