import mongoose, { Document } from 'mongoose';
import { IRequest, RequestSchema } from './Request';
import { ISkill, SkillSchema } from './Skills';

export interface IUser extends Document {
  username: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  skills: ISkill[];
  requests: IRequest[];
}

export type ICreateUser = Pick<IUser, 'name' | 'email' | 'password'>;

export const UserSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9_]{3,30}$/
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  },
  skills: {
    type: [SkillSchema],
    required: false
  },
  requests: {
    type: [RequestSchema],
    required: false
  }
});

export const User = mongoose.model<IUser>('users', UserSchema);
