import { RequestHandler } from 'express';
import { validationResult, check } from 'express-validator';
import { MessagerModel } from '../models/messageModel';
import MessageDB from '../models/messageSchema';
import UserDB from '../models/userSchema';

interface AddBody {
  text: string;
}

const addMessage: RequestHandler = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { text } = req.body as AddBody;

  const username = req.params.username;

  try {
    // find username
    const user = await UserDB.findOne({ username });

    if (!user)
      return res.status(404).json({ errors: [{ msg: 'User does not exist' }] });

    // save message
    const messageBody = {
      text,
      userId: user.id,
    };

    const message = new MessageDB(messageBody);

    await message.save();

    res.status(200).json({ msg: 'Message sent succesfully', sent: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
};

export { addMessage };