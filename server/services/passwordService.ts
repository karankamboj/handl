import argon2 from 'argon2';

export class PasswordService {
    // Method to hash a password
    public async hashPassword(password: string): Promise<string> {
        try {
            const hashedPassword = await argon2.hash(password);
            return hashedPassword;
        } catch (error) {
            throw new Error('Error hashing password');
        }
    }

    // Method to verify a password against a stored hash
    public async verifyPassword(storedHash: string, inputPassword: string): Promise<boolean> {
        try {
            const match = await argon2.verify(storedHash, inputPassword);
            return match;
        } catch (error) {
            throw new Error('Error verifying password');
        }
    }
}
