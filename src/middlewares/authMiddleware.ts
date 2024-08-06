import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader;

    jwt.verify(token, 'clan-ritchie', (err, user) => {
      if (err) {
        return res.sendStatus(403).json({ status: 403, message:"Su sesion ha terminado, inicie sesion nuevamente" });
      }
      next();
    });
  } else {
    res.sendStatus(401);
  }
};