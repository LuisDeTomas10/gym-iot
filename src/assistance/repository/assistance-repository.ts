import { Assistance } from '../../entities/assistance';
import { AppDataSource } from '../../config/data-source';

export const createAssistance = async (
  assistance: Assistance
): Promise<Assistance> => {
  const assistanceRepository = AppDataSource.getRepository(Assistance);
  return await assistanceRepository.save(assistance);
};

export const getAssistanceByUserId = async (
  userId: number
): Promise<Assistance[]> => {
  const assistanceRepository = AppDataSource.getRepository(Assistance);
  return await assistanceRepository.find({ where: { user_id: userId } });
};

export const updateAssistance = async (
  id: number,
  updatedFields: Partial<Assistance>
): Promise<Assistance | null> => {
  const assistanceRepository = AppDataSource.getRepository(Assistance);
  const assistance = await assistanceRepository.findOne({ where: { id } });

  if (assistance) {
    Object.assign(assistance, updatedFields);
    return await assistanceRepository.save(assistance);
  }

  return null;
};

export const getAssistanceById = async (
  id: number
): Promise<Assistance | null> => {
  const assistanceRepository = AppDataSource.getRepository(Assistance);
  return await assistanceRepository.findOne({ where: { id } });
};

export const deleteAssistance = async (id: number): Promise<boolean> => {
  const assistanceRepository = AppDataSource.getRepository(Assistance);
  const result = await assistanceRepository.delete(id);
  return result.affected === 1;
};
