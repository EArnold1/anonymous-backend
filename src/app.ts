import express, { Request, Response } from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// middlewares

app.use(json());

app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.json({ msg: 'you are here' });
});

app.listen(process.env.PORT, () =>
  console.log(`App running on ${process.env.PORT}`)
);
