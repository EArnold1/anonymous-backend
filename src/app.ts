import express, { Request, Response } from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import * as OneSignal from 'onesignal-node';
import connectDB from './db/db';
import dotenv from 'dotenv';
import user from './routes/api/user';
import auth from './routes/api/auth';
import message from './routes/api/message';
dotenv.config();

const app = express();

export const client = new OneSignal.Client(
  process.env.APP_ID_ONESIGNAL!,
  process.env.API_KEY_ONESIGNAL!
);

// connect db
connectDB();

// middlewares

app.use(json());

app.use(cors());

app.use('/api', user);
app.use('/api', auth);
app.use('/api', message);

app.get('/', async (req: Request, res: Response) => {
  res.json({ msg: 'you are here' });
});

app.listen(process.env.PORT, () =>
  console.log(`App running on ${process.env.PORT}`)
);
