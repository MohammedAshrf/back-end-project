import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  //   username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  role: string;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String },
    // username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    role: { type: String, default: 'user' },
  },
  { timestamps: true },
);

export const User = mongoose.model<IUser>('User', UserSchema);
