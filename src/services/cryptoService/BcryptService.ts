// implementa ICryptoService para bcrypt
import { ICryptoService } from './ICryptoService';
import bcrypt from 'bcrypt';

export class BcryptService implements ICryptoService {
  async hash(payload: string): Promise<string> {
    return bcrypt.hash(payload, 8);
  }

  async compare(payload: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(payload, hashed);
  }
}
