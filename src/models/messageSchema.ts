import { Schema, model } from 'mongoose';
import { MessagerModel } from './messageModel';

const MessageSchema = new Schema<MessagerModel>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const MessageDB = model<MessagerModel>('message', MessageSchema);

export default MessageDB;
