import { RequestHandler } from 'express';
import { validationResult, check } from 'express-validator';
import { UserModel } from '../models/userModel';
import UserDB from '../models/userSchema';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const registerUser: RequestHandler = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body as UserModel;

  try {
    if (username.length < 4)
      return res
        .status(401)
        .json({ errors: [{ msg: 'Username is too short' }] });

    // username & email check
    let user_name = await UserDB.findOne({ username });

    if (user_name)
      return res
        .status(401)
        .json({ errors: [{ msg: 'Username already exists' }] });

    let user_email = await UserDB.findOne({ email });

    if (user_email)
      return res
        .status(401)
        .json({ errors: [{ msg: 'Email already exists' }] });

    let user: UserModel = {
      username,
      email,
      password,
    };

    // password encryption
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    // initializing user
    const newUser = new UserDB(user);

    await newUser.save();

    // preparing jwt payload
    const payload = {
      user: {
        id: newUser.id,
      },
    };

    // signing jwt token
    jwt.sign(
      payload,
      process.env.JWT_SECRET!,
      {
        expiresIn: '1d',
      },
      async (err, token) => {
        if (err) throw err;

        res.status(200).json({ token });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
};

export { registerUser };
