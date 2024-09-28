import { Request, Response } from 'express';
import { register, login } from '../services/authService';

// Controller to handle user registration
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body; // Get user details from request body
    const newUser = await register(username, password);
    res.status(201).json(newUser);
  } catch (error) {
    if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'An unknown error occurred.' });
      }
  }
};

// Controller to handle user login
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body; // Get user details from request body
    const token = await login(username, password);
    res.status(200).json({ token });
  } catch (error) {
    if (error instanceof Error) {
        res.status(401).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'An unknown error occurred.' });
      }
  }
};
