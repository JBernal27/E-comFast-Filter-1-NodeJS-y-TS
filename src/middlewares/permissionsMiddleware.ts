import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';


export const authenticatePermissionsJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader;
    try {
      const decoded = jwt.verify(token, 'clan-ritchie') as User;      
      if (decoded.roleId === 1) {
        next();
      } else {
        res.sendStatus(401);
      }
    } catch (err) {
      res.status(498).json({ message: 'Invalid token' });
    }
  } else {
    return res.sendStatus(401);
  }
};
