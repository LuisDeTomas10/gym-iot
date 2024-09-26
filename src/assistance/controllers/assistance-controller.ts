import { Request, Response } from 'express';
import { AssistanceService } from '../services/assistance-service';

const assistanceService = new AssistanceService();

export const list = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: 'User ID is required' });
      return;
    }

    const response = await assistanceService.list(Number(id));
    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, activity } = req.body;

    if (!userId || !activity) {
      res.status(400).json({ message: 'User ID and activity are required' });
      return;
    }

    const response = await assistanceService.register({ userId, activity });

    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    // const { id } = req.params;
    // const assistanceData = req.body;
    // if (!id || !assistanceData) {
    //   res.status(400).json({ message: 'Assistance ID and data are required' });
    //   return;
    // }
    // const response = await assistanceService.update(id, assistanceData);
    // res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
