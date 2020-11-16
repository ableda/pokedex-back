import { Router } from 'express';
import passport from '../passport';

import health from './health';
import authentication from './authentication';
import pokedex from './pokedex';
import pokemon from './pokemon';

const router: Router = Router();

router.use(health);
router.use(authentication);
router.use(pokemon);
router.use(passport.authenticate('jwt', { session: false }), pokedex);

export default router;
