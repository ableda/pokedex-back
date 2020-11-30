import passport from '../../passport';
import { NextFunction, Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { jwtConfig } from '../../config/jwt';

const cookieConfig = {
  // TODO: in production http-only should be true and token accessed via cookies!

  // httpOnly: true, // to disable accessing cookie via client side js
  //secure: true, // to force https (if you use it)
  maxAge: 1000000, // ttl in seconds (remove this option and cookie will die when browser is closed)
  // signed: true // if you use the secret with cookieParser
};
// there is many other params you can find here https://www.npmjs.com/package/cookie#options-1

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

        return res.cookie('jwt', token, cookieConfig).json({ token, userId: user._id });
      });

     } catch (error) {
      return next(error);
    }
  })(req, res, next);
};
