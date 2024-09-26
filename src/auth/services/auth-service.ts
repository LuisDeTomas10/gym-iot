import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../../entities/user';
import { createUser, getUserByEmail } from '../repository/user-repository';
import { ERROR_AUTH_TYPES } from '../../errores/error-types';
import { getRoleById } from '../repository/role-repository';

type ResponseAuth = {
  success: boolean;
  token?: string;
  type?: string;
  message?: string;
  user?: Omit<User, 'password'>;
};

export class AuthService {
  async login(email: string, password: string): Promise<ResponseAuth | null> {
    const user: User | null = await getUserByEmail(email);

    if (!user) {
      return {
        success: false,
        type: ERROR_AUTH_TYPES.INVALID_USER,
        message: 'Usuario no encontrado',
      };
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return {
        success: false,
        type: ERROR_AUTH_TYPES.INVALID_PASSWORD,
        message: 'Contraseña incorrecta',
      };
    }

    const { password: _password, ...userWithoutPassword } = user;
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    return {
      success: true,
      token,
      user: userWithoutPassword,
    };
  }

  async register(user: User): Promise<ResponseAuth | null> {
    const userByEmail = await getUserByEmail(user.email);
    console.log(user);
    if (userByEmail) {
      return {
        success: false,
        type: ERROR_AUTH_TYPES.USER_ALREADY_EXISTS,
        message: 'El usuario ya existe',
      };
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    let newUser = new User();
    newUser = { ...user };
    newUser.email = user.email;
    newUser.password = hashedPassword;
    newUser.role = await getRoleById(Number(user.role));

    const savedUser: User = await createUser(newUser);
    return {
      success: true,
      user: savedUser,
    };
  }
}
