import { Request } from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { UserModel } from '../models/User';
import { jwtConfig } from '../config/jwt';

passport.use('signup', new LocalStrategy({
  usernameField : 'email',
  passwordField : 'password',
}, async (email, password, done) => {
    try {
      const userWithEmail = await UserModel.findOne({ email });

      if (userWithEmail) {
        throw new Error('User already exists');
      }

      const user = await UserModel.create({ email, password });
      return done(null, user);
    } catch (error) {
      done(error);
    }
}));

passport.use('login', new LocalStrategy({
  usernameField : 'email',
  passwordField : 'password'
}, async (email, password, done) => {
  try {

    const user = await UserModel.findOne({ email });
    if (!user) {
      return done(null, false, { message : 'User not found'});
    }

    // Validate password and make sure it matches with the corresponding hash stored in the database
    // If the passwords match, it returns a value of true.
    const validate = await user.isValidPassword(password);
    if( !validate ){
      return done(null, false, { message : 'Wrong Password'});
    }

    return done(null, user, { message : 'Logged in Successfully'});
  } catch (error) {
    return done(error);
  }
}));

passport.use(new JwtStrategy({
  secretOrKey : jwtConfig.jwtSecret,
  jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
  passReqToCallback: true
}, async (req: Request, token, done: Function) => {
  try {

    if (!token.user || !token.user._id) {
      throw new Error('Bad bearer token');
    }

    const user = await UserModel.findById(token.user._id);
    if (!user) {
      throw new Error('Bad bearer token');
    }

    req.user = user;
    return done(null, token.user);
  } catch (error) {
    done(error);
  }
}));

export default passport;
