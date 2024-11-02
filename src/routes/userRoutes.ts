import { UserController } from '../controllers/UserController';
import { UserRepositoryPrisma } from '../repositories/implementations/prisma/UserRepositoryPrisma';
import { BcryptService } from '../services/cryptoService/BcryptService';
import { AuthMiddleware } from '../services/httpService/AuthMiddleware';
import { IHttpServer } from '../services/httpService/IHttpServer';
import { JwtTokenService } from '../services/tokenService/jwtTokenService';
import { UserCreateUseCase } from '../useCases/User/CreateUserUseCase';
import { LoginUserUseCase } from '../useCases/User/LoginUserUseCase';

const userRepository = new UserRepositoryPrisma();
const bcryptService = new BcryptService();
const jwtTokenService = new JwtTokenService();

const userCreateUseCase = new UserCreateUseCase(userRepository, bcryptService);
const loginUserUseCase = new LoginUserUseCase(userRepository, bcryptService, jwtTokenService);

const userController = new UserController(userCreateUseCase, loginUserUseCase);

export function userRoutes(server: IHttpServer) {
  server.post('/register', (req, res) => userController.createUser(req, res));
  server.post('/login', (req, res) => userController.loginUser(req, res));
  server.post(
    '/protegida',
    AuthMiddleware((req, res) => {
      res.send({ message: 'This is a protected route' });
    }),
  );
}
