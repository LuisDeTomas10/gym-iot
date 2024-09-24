import { Request, Response } from 'express';
import { AuthService } from '../services/auth-service';

const authService = new AuthService();

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required' });
      return;
    }

    const response = await authService.login(email, password);

    res.status(200).json(response);
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = req.body;

    if (!user) {
      res.status(400).json({ message: 'User data is required' });
      return;
    }

    const response = await authService.register(user);

    res.status(200).json(response);
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};
