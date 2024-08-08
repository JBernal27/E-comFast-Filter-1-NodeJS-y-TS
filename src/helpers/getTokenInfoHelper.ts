import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

type TTokenInformation = {
    id: number
    email: string
    roleId: number
}

export const getTokenInformationHelper = (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader;
    try {
      const decodedTokenInfo = jwt.verify(token, 'clan-ritchie') as TTokenInformation;      
      return decodedTokenInfo
    } catch (err) {
      res.status(498).json({ message: 'Token invalido' });
    }
  } else {
    res.status(401).json({
        status:401,
        message:"No has iniciado sesion"
    });
  }
};
