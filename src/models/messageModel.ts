import { Types } from 'mongoose';

export interface MessagerModel {
  userId: Types.ObjectId;
  text: string;
  date?: Date;
}
