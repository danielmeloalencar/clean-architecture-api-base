import { Id } from '../../entities/_shared/Id';
import { Email } from '../../entities/User/User.Email';
import { User } from '../../entities/User/User.Entity';
import { Name } from '../../entities/User/User.Name';
import { Password } from '../../entities/User/User.Password';
import { IUserRepository } from '../../repositories/interfaces/IUserRepository';
import { ICryptoService } from '../../services/cryptoService/ICryptoService';
import { IUseCase } from '../IUseCase';

export type UserCreateInputDTO = {
  name: string;
  email: string;
  password: string;
};

export type UserCreateOutputDTO = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export class UserCreateUseCase implements IUseCase<UserCreateInputDTO, UserCreateOutputDTO> {
  constructor(
    private repository: IUserRepository,
    private cryptoService: ICryptoService,
  ) {}

  async execute(inputDTO: UserCreateInputDTO): Promise<UserCreateOutputDTO> {
    const userAlreadyExists = await this.repository.findByEmail(inputDTO.email);
    if (userAlreadyExists) {
      throw new Error('User already exists');
    }

    const password = Password.create(inputDTO.password);
    const encryptedPassword = await this.cryptoService.hash(password.getValue());

    const user = User.create({
      id: Id.create(),
      name: Name.create(inputDTO.name),
      email: Email.create(inputDTO.email),
      password: Password.createHashed(encryptedPassword),
    });

    const savedUser = await this.repository.save(user);

    return {
      id: savedUser.id.getValue(),
      name: savedUser.name.getValue(),
      email: savedUser.email.getValue(),
      createdAt: savedUser.createdAt,
      updatedAt: savedUser.updatedAt,
    };
  }
}
