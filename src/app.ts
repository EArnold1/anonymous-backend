import express, { Request, Response } from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import connectDB from './db/db';
import dotenv from 'dotenv';
import user from './routes/api/user';
dotenv.config();

const app = express();

// connect db
connectDB();

// middlewares

app.use(json());

app.use(cors());

app.use('/api', user);

app.get('/', (req: Request, res: Response) => {
  res.json({ msg: 'you are here' });
});

app.listen(process.env.PORT, () =>
  console.log(`App running on ${process.env.PORT}`)
);
