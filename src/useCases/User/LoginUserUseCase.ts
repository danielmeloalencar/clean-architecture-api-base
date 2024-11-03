import { IUseCase } from '../IUseCase';
import { IUserRepository } from '../../repositories/interfaces/IUserRepository';
import { ICryptoService } from '../../services/cryptoService/ICryptoService';
import { ITokenService } from '../../services/tokenService/ITokenService';

export type UserLoginInputDTO = {
  email: string;
  password: string;
};

export type UserLoginOutputDTO = {
  token: string;
};

export class LoginUserUseCase implements IUseCase<UserLoginInputDTO, UserLoginOutputDTO> {
  constructor(
    private repository: IUserRepository,
    private cryptoService: ICryptoService,
    private tokenService: ITokenService,
  ) {}

  async execute(inputDTO: UserLoginInputDTO): Promise<UserLoginOutputDTO> {
    const user = await this.repository.findByEmail(inputDTO.email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isPasswordValid = await this.cryptoService.compare(inputDTO.password, user.password.getValue());
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    const token = this.tokenService.generateToken({ userId: user.id.getValue() });
    return { token };
  }
}
