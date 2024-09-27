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

export const deleteAssistance = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: 'ID is required' });
      return;
    }

    const response = await assistanceService.delete(Number(id));

    if (response.success) {
      res.status(200).json({ message: 'Activity deleted successfully' });
    } else {
      res.status(404).json({ message: 'Activity not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, activity, activityType, repetitions } = req.body;

    if (!userId || !activity) {
      res.status(400).json({ message: 'User ID and activity are required' });
      return;
    }

    const response = await assistanceService.register({
      userId,
      activityType,
      repetitions,
      activity,
    });

    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { activity_type, repetitions, activity, check_in_time } = req.body;
    console.log(id);

    if (!id || !activity_type || !repetitions || !activity || !check_in_time) {
      res.status(400).json({ message: 'Activity ID and data are required' });
      return;
    }

    const response = await assistanceService.update({
      id: Number(id),
      activity_type,
      repetitions,
      activity,
      check_in_time,
    });

    console.log(response);
    
    res.status(200).json(response);

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
