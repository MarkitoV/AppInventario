import { Request, Response } from 'express';
import User, { IUser } from '../models/User';
import jwt from 'jsonwebtoken';

export const signup = async (req: Request, res: Response) => {
  // saving a new user
  const user: IUser = new User({
    userName: req.body.userName,
    password: req.body.password
  });
  const savedUser = await user.save();
  // token
  
  res.send('signup');
};

export const signin = (req: Request, res: Response) => {
  res.send('signin');
};

export const profile = (req: Request, res: Response) => {
  res.send('profile');
};