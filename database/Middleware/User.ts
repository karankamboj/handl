import { DBCatchable } from '../../library/Decorators/DBCatchable';
import { Nullish } from '../../library/Types';
import { ISkill } from '../Models/Skills';
import { INewUser, IUser } from '../Models/User';
import User from '../Models/User';

export class UserCRUD {
  @DBCatchable('Error creating user')
  public static async createUser(user: INewUser): Promise<IUser> {
    const newUserDate = {
      ...user,
      createdAt: new Date().getTime()
    };

    return await User.create(newUserDate);
  }

  @DBCatchable('Error getting user by username')
  public static async getUserByUsername(
    username: string
  ): Promise<Nullish<IUser>> {
    return await User.findOne({ username });
  }

  @DBCatchable('Error getting user by id')
  public static async getUserById(id: string): Promise<Nullish<IUser>> {
    return await User.findById(id);
  }

  @DBCatchable('Error getting all users')
  public static async getAllUsers(populate: boolean = false): Promise<IUser[]> {
    if (populate) {
      const users = await User.find().populate('skills').populate('requests');
      users.map((user) => {
        user.skills?.map((skill) => skill.name);
      });
      return users;
    }

    return await User.find();
  }

  @DBCatchable('Error updating user')
  public static async updateUser(
    username: string,
    updateData: Partial<IUser>
  ): Promise<Nullish<IUser>> {
    return await User.findOneAndUpdate({ username }, updateData, { new: true });
  }

  @DBCatchable('Error deleting user')
  public static async deleteUser(username: string): Promise<void> {
    await User.findOneAndDelete({ username });
  }

  @DBCatchable('Error getting user skills')
  public static async getUserSkills(username: string): Promise<ISkill[]> {
    const userWithSkills = await User.findOne({ username }).populate('skills');
    return userWithSkills?.skills || [];
  }

  @DBCatchable('Error setting user skills')
  public static async setUserSkills(
    username: string,
    skill: string[]
  ): Promise<IUser> {
    const user = await User.findOneAndUpdate(
      { username },
      { $push: { skills: { $each: skill } } },
      { new: true, upsert: true }
    );

    return user;
  }

  @DBCatchable('Error getting user requests')
  public static async getUserRequests(
    username: string
  ): Promise<Nullish<IUser>> {
    const userWithRequests = await User.findOne({ username }).populate(
      'requests'
    );
    return userWithRequests;
  }

  @DBCatchable('Error setting user requests')
  public static async setUserRequests(
    username: string,
    request: unknown[]
  ): Promise<IUser> {
    const user = await User.findOneAndUpdate(
      { username },
      { $push: { requests: { $each: request } } },
      { new: true, upsert: true }
    );

    return user;
  }
}
