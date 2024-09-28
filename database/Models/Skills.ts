import mongoose from 'mongoose';

export interface ISkill {
  name: string;
}

export const SkillSchema = new mongoose.Schema<ISkill>({
  name: {
    type: String,
    required: true
  }
});

export const Skill = mongoose.model<ISkill>('skills', SkillSchema);
