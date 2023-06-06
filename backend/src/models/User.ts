import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document{
  userName: string;
  password: string;
}

const userSchema = new Schema({
  userName: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true,
  }
});

export default model<IUser>('User', userSchema);