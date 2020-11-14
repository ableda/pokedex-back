import { Router } from 'express';
import passport from '../passport';
import { login, signUp } from '../controllers/authentication';

const router: Router = Router();

router.post('/signup', passport.authenticate('signup', { session : false }), signUp);

router.post('/login', login);

// Example of getting secret resource with jwt from login
router.get('/secret-resource', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  res.json({
    message: 'Authentication succeded with jwt'
  });
});

export default router;
