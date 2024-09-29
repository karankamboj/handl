import { INewSkill, ISkill, Skill } from '../Models/Skills';

export class SkillCRUD {
  public static async createSkill(skill: INewSkill): Promise<ISkill> {
    return await Skill.create(skill);
  }

  public static async deleteSkill(skill: string): Promise<void> {
    await Skill.findOneAndDelete({ name: skill });
  }

  public static async addManySkills(skills: INewSkill[]): Promise<ISkill[]> {
    return await Skill.insertMany(skills);
  }

  public static async getSkillsByName(skills: string[]): Promise<ISkill[]> {
    return await Skill.find({ name: { $in: skills } });
  }
}
