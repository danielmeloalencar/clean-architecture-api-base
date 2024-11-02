import jwt from 'jsonwebtoken';
import { ITokenService } from './ITokenService';

export class JwtTokenService implements ITokenService {
  private readonly secret = process.env.JWT_SECRET || 'default_secret';

  generateToken(payload: object): string {
    return jwt.sign(payload, this.secret, { expiresIn: '1h' });
  }

  verifyToken(token: string): object | null {
    try {
      const decoded = jwt.verify(token, this.secret);
      if (typeof decoded === 'object' && decoded !== null) {
        return decoded;
      }
      return null;
    } catch {
      return null;
    }
  }
}
