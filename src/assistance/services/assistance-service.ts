import moment from 'moment-timezone';
import { Assistance } from '../../entities/assistance';
import {
  createAssistance,
  deleteAssistance,
  getAssistanceByUserId,
  updateAssistance,
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
    activityType,
    repetitions,
    activity,
  }: {
    userId: number;
    activityType: string;
    repetitions: number;
    activity: string;
  }): Promise<ResponseAssistance> {
    let newAssistance = new Assistance();

    const nowInPeru = moment().tz('America/Lima');

    newAssistance.user_id = userId;
    newAssistance.activity_type = activityType;
    newAssistance.repetitions = repetitions;
    newAssistance.activity = activity;
    newAssistance.check_in_time = nowInPeru.format('HH:mm:ss');
    newAssistance.check_out_time = null;
    newAssistance.assistance_date = nowInPeru.format('YYYY-MM-DD');

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

  async delete(userId: number): Promise<{ success: boolean }> {
    const result = await deleteAssistance(userId);

    if (!result) {
      return { success: false };
    }

    return { success: true };
  }

  async update({
    id,
    activity_type,
    repetitions,
    activity,
    check_in_time,
  }: {
    id: number;
    activity_type: string;
    repetitions: number;
    activity: string;
    check_in_time: string;
  }): Promise<ResponseAssistance> {
    // Llamar a updateAssistance con dos argumentos: id y el objeto con los campos actualizados
    const updatedAssistance = await updateAssistance(id, {
      activity_type,
      repetitions,
      activity,
      check_in_time,
    });

    if (!updatedAssistance) {
      return {
        success: false,
        message: 'No se pudo actualizar la asistencia',
      };
    }

    return {
      success: true,
      assistance: updatedAssistance,
      message: 'Asistencia actualizada exitosamente',
    };
  }
}
