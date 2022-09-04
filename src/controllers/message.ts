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

const getMessages: RequestHandler = async (req, res) => {
  const { id } = req.user!;
  const { page, limit } = req.query as { page: string; limit: string };

  const startIndex = (+page - 1) * +limit;

  const endIndex = +page * +limit;

  let nextPage = {
    page: 0,
    limit: 0,
  };
  let prevPage = {
    page: 0,
    limit: 0,
  };
  try {
    // get messages
    const messages = await MessageDB.find({ userId: id })
      .skip(startIndex)
      .limit(+limit)
      .exec();

    if (!messages)
      return res.status(404).json({ errors: [{ msg: 'Nothing found' }] });

    // where to end
    if (startIndex > 0) {
      prevPage.page = +page - 1;
      prevPage.limit = +limit;
    }

    // where to stop
    if (endIndex < (await MessageDB.find({ userId: id })).length) {
      nextPage.page = +page + 1;
      nextPage.limit = +limit;
    }

    res.status(200).json({ messages, nextPage, prevPage });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
};

const getLatestMessage: RequestHandler = async (req, res) => {
  const { id } = req.user!;
  try {
    // find messages & sort by date (asc)
    const message = await MessageDB.find({ userId: id })
      .sort({ date: -1 })
      .limit(1);

    if (!message)
      return res.status(404).json({ errors: [{ msg: 'Nothing found' }] });

    // get first element in array
    res.status(200).json({ message: message });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
};

export { addMessage, getMessages, getLatestMessage };
