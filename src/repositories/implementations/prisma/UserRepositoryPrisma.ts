import { User } from '../../../entities/User/User.Entity';
import { prisma } from '../../../utils/Prisma';
import { IUserRepository } from '../../interfaces/IUserRepository';

export class UserRepositoryPrisma implements IUserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      return User.toJSON(user.id, user.name, user.email, user.password, user.created_at, user.updated_at);
    }
    return null;
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id } });
    if (user) {
      return User.toJSON(user.id, user.name, user.email, user.password, user.created_at, user.updated_at);
    }
    return null;
  }

  async save(user: User): Promise<User> {
    const userCreated = await prisma.user.create({
      data: {
        id: user.id.getValue(),
        name: user.name.getValue(),
        email: user.email.getValue(),
        password: user.password.getValue(),
        created_at: user.createdAt,
        updated_at: user.updatedAt,
      },
    });
    return User.toJSON(userCreated.id, userCreated.name, userCreated.email, userCreated.password, userCreated.created_at, userCreated.updated_at);
  }
}
