import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export default function (req: Request, res: Response, next: NextFunction) {
  // Get token
  let token: string | null = null;

  if (
    req.headers['authorization'] &&
    req.headers['authorization'].split(' ')[0] === 'Bearer'
  ) {
    token = req.headers['authorization'].split(' ')[1];
  }

  if (token === null) {
    return res.status(401).json({ errors: [{ msg: 'Not authorized' }] });
  }

  try {
    // decode user
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    req.user = decoded.user;

    next();
  } catch (err) {
    return res.status(401).json({ errors: [{ msg: 'Invalid token' }] });
  }
}
