import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { IUserRequest } from '../models/User';
import config from 'config';

export const protect = (req: IUserRequest, res: Response, next: NextFunction) =>  {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    jwt.verify(token, config.get('jwtSecret'), (error, decoded: any) => {
      if (error) {
        return res.status(401).json({ msg: 'Token is not valid' });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    console.error('something wrong with auth middleware');
    res.status(500).json({ msg: 'Server Error' });
  }
}

export const admin = (req: IUserRequest, res: Response, next: NextFunction) => {

    if(req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error("no token, no auth");
    }

}