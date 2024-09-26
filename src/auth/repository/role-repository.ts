import { Role } from '../../entities/roles';
import { AppDataSource } from '../../config/data-source';

export const getRoleById = async (roleId: number): Promise<Role> => {
  const roleRepository = AppDataSource.getRepository(Role);
  const role = await roleRepository.findOne({ where: { id: roleId } });
  return role as Role;
};
