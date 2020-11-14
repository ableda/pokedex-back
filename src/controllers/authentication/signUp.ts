import { NextFunction, Request, Response } from 'express';

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message : 'Signup successful',
    user : req.user
  });
};
