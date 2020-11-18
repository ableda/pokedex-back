import { Router } from 'express';
import passport from '../passport';
import { login, signUp } from '../controllers/authentication';

const router: Router = Router();

router.post('/signup', passport.authenticate('signup', { session : false }), signUp);

router.post('/login', login);

export default router;
