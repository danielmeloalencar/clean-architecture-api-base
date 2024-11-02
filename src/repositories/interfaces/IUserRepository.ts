import { User } from '../../entities/User/User.Entity';

export interface IUserRepository {
  save(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;

  // update(user: User): Promise<User>;
  // delete(id: string): Promise<void>;
}
