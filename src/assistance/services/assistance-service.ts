import { Assistance } from '../../entities/assistance';
import {
  createAssistance,
  getAssistanceByUserId,
} from '../repository/assistance-repository';

type ResponseAssistance = {
  success: boolean;
  message?: string;
  assistance?: Assistance;
  assistances?: Assistance[];
};

export class AssistanceService {
  async register({
    userId,
    activity,
  }: {
    userId: number;
    activity: string;
  }): Promise<ResponseAssistance> {
    let newAssistance = new Assistance();
    newAssistance.user_id = userId;
    newAssistance.activity = activity;
    newAssistance.check_in_time = new Date().toLocaleTimeString();
    newAssistance.check_out_time = null;
    newAssistance.assistance_date = new Date().toISOString().split('T')[0];

    const savedAssistance = await createAssistance(newAssistance);

    return {
      success: true,
      assistance: savedAssistance,
      message: 'Asistencia registrada exitosamente',
    };
  }

  async list(userId: number): Promise<ResponseAssistance> {
    const assistances = await getAssistanceByUserId(userId);

    return {
      success: true,
      assistances,
    };
  }
}
