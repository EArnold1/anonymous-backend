import { Schema, model } from 'mongoose';
import { UserModel } from './userModel';

const UserSchema = new Schema<UserModel>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const UserDB = model<UserModel>('user', UserSchema);

export default UserDB;
