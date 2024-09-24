import { User } from '../entities/user';
import { AppDataSource } from '../../config/data-source';

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({
    where: { email: email },
    relations: ['role'],
  });
  console.log(user);
  return user || null;
};

export const createUser = async (user: User): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);
  const newUser = userRepository.create(user);
  await userRepository.save(newUser);
  return newUser;
};
