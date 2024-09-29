import mongoose, { Types } from 'mongoose';

export interface ISkill {
  _id: Types.ObjectId;
  name: string;
}

export interface INewSkill extends Pick<ISkill, 'name'> {}

const SkillSchema = new mongoose.Schema<ISkill>({
  name: {
    type: String,
    required: true
  }
});

export const Skill = mongoose.model<ISkill>('skills', SkillSchema);
