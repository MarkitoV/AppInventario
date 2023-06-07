import { Request, Response } from 'express';
import User, { IUser } from '../models/User';
import jwt from 'jsonwebtoken';

// METHOD FOR CREATING A NEW USER
export const signup = async (req: Request, res: Response) => {
  // saving a new user
  const user: IUser = new User({
    userName: req.body.userName,
    password: req.body.password
  });
  user.password = await user.encryptPassword(user.password);
  const savedUser = await user.save();
  // token
  const token: string = jwt.sign({ _id: savedUser._id }, process.env.SECRET_KEY || 'tokentest', {
    expiresIn: 60 * 60 * 3
  });
  res.header('auth-token', token).json(savedUser);
};

// METHOD FOR LOGIN A USER
export const signin = async (req: Request, res: Response) => {
  const user = await User.findOne({ userName: req.body.userName });
  if (!user) {
    return res.status(400).json('Name or password are wrong.');
  }
  const correctPassword: boolean = await user.validatePassword(req.body.password);
  if (!correctPassword) {
    return res.status(400).json('Invalid Password');
  }
  const token: string = jwt.sign({ _id: user._id }, process.env.SECRET_KEY || 'tokentest', {
    expiresIn: 60 * 60 * 3
  });
  res.header('auth-token', token).json(user);
};

// METHOD FOR SEE A USER PROFILE
export const profile = (req: Request, res: Response) => {
  res.send('profile');
};