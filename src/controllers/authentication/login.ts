import passport from '../../passport';
import { NextFunction, Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { jwtConfig } from '../../config/jwt';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if(err || !user){
        console.log(err);
        const error = new Error(err ? err : 'User cannot be authenticated');
        return next(error);
      }

      req.login(user, { session : false }, async (error) => {
        if( error ) return next(error)

        const body = { _id : user._id, email : user.email };
        // Sign the JWT token and populate the payload with the user email and id
        const token = sign({ user : body }, jwtConfig.jwtSecret, { expiresIn: jwtConfig.jwtExpiration });

        return res.json({ token });
      });

     } catch (error) {
      return next(error);
    }
  })(req, res, next);
};
