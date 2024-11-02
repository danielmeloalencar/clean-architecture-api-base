import { IHttpRequest, IHttpResponse } from '../services/httpService/IHttpServer';
import { IUseCase } from '../useCases/IUseCase';
import { UserCreateInputDTO, UserCreateOutputDTO } from '../useCases/User/CreateUserUseCase';
import { UserLoginInputDTO, UserLoginOutputDTO } from '../useCases/User/LoginUserUseCase';

export class UserController {
  constructor(
    private userCreateUseCase: IUseCase<UserCreateInputDTO, UserCreateOutputDTO>,
    private loginUserUseCase: IUseCase<UserLoginInputDTO, UserLoginOutputDTO>,
  ) {}

  async createUser(req: IHttpRequest, res: IHttpResponse): Promise<void> {
    try {
      const userData = req.body as UserCreateInputDTO;
      const user = await this.userCreateUseCase.execute(userData);
      res.status(201).send(user);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send({ error: error.message });
      } else {
        res.status(400).send({ error: 'Unknown error' });
      }
    }
  }

  async loginUser(req: IHttpRequest, res: IHttpResponse): Promise<void> {
    try {
      const loginData = req.body as UserLoginInputDTO;
      const result = await this.loginUserUseCase.execute(loginData);
      res.status(200).send(result);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send({ error: error.message });
      } else {
        res.status(400).send({ error: 'Unknown error' });
      }
    }
  }
}
