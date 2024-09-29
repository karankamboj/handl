import { PasswordService } from './passwordService'; // Adjust the path as necessary

interface User {
    id: string;
    username: string;
    hashedPassword: string; // In production, this should be hashed
    skills: string[]; // Add a list of skills
}

let users: User[] = []; // In-memory store for users
const passwordService = new PasswordService(); 

// Service to handle user registration
export const register = async (username: string, password: string, skills: string[]): Promise<User> => {
    // Check if the user already exists
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
            throw new Error('User already exists');
    }
    const hashedPassword = await passwordService.hashPassword(password);
    // Create a new user
    const newUser: User = {
            id: (users.length + 1).toString(),
            username,
            hashedPassword, // Store plain password for demonstration (hash in production)
            skills, // Store the skills array
        };
        users.push(newUser);
        return newUser;
};

// Service to handle user login
export const login = async (username: string, password: string): Promise<string> => {

    
    const user = users.find(user => user.username === username );
    // const isMatch = await passwordService.verifyPassword(hashedPassword, 'mySecurePassword');
    if (!user) {
        throw new Error('Invalid username');
    }
    const isMatch = await passwordService.verifyPassword(user.hashedPassword, password);
    if(!isMatch) {
        throw new Error('Invalid password');
    }
    // Generate a simple token (replace with JWT or other mechanism in production)
    const token = `token-${user.id}`;
    return token;
};

// Service to handle fetching user skills
export const getUserSkills = async (username: string): Promise<string[]> => {
    const user = users.find(user => user.username === username);
    if (!user) {
        throw new Error('User not found');
    }
    return user.skills; // Return the skills array
};