import { DBCatchable } from '../../library/Decorators/DBCatchable';
import { INewSkill, ISkill, Skill } from '../Models/Skills';

export class SkillCRUD {
  @DBCatchable('Error creating skill')
  public static async createSkill(skill: INewSkill): Promise<ISkill> {
    return await Skill.create(skill);
  }

  @DBCatchable('Error getting skill by name')
  public static async deleteSkill(skill: string): Promise<void> {
    await Skill.findOneAndDelete({ name: skill });
  }

  @DBCatchable('Error getting skill by name')
  public static async addManySkills(skills: INewSkill[]): Promise<ISkill[]> {
    return await Skill.insertMany(skills);
  }

  @DBCatchable('Error getting skill by name')
  public static async getSkillsByName(skills: string[]): Promise<ISkill[]> {
    return await Skill.find({ name: { $in: skills } });
  }

  @DBCatchable('Error getting all skills')
  public static async getAllSkills(): Promise<ISkill[]> {
    const skills = await Skill.find();

    return skills.map((skill) => ({
      ...skill,
      _id: skill._id.toString()
    }));
  }
}
