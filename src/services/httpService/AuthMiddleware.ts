import jwt from 'jsonwebtoken';
import { IHttpRequest, IHttpResponse } from './IHttpServer';

export function AuthMiddleware(handler: (req: IHttpRequest, res: IHttpResponse) => void) {
  return (req: IHttpRequest, res: IHttpResponse) => {
    try {
      if (!req.headers || !req.headers.authorization) {
        res.status(401).send({ error: 'Token not provided' });
        return;
      }

      const token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
      req.user = decoded;
      handler(req, res);
    } catch {
      res.status(401).send({ error: 'Invalid token' });
    }
  };
}
