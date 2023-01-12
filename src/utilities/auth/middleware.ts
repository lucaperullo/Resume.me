import { Request, Response, NextFunction } from 'express';
import { verifyJWT } from './index';
import UserSchema from '../../routes/user/schema';

export const authorize = async (req: any, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.accessToken;
    console.log(req.cookies);
    const decoded: any = await verifyJWT(token);
    const user: any = await UserSchema.findOne({ _id: decoded._id });

    if (!user) {
      throw new Error();
    }
    req.accessToken = token;
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const adminOnly = async (req: any, res: Response, next: NextFunction) => {
  try {
    if (req.user.role !== 'Admin') {
      res.status(401).send('You are not authorized to access this service!');
      throw new Error();
    }
    next();
  } catch (error) {
    next(error);
  }
}
