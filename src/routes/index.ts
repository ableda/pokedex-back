import { Router } from 'express';
import health from './health';
import authentication from './authentication';

const router: Router = Router();

router.use(health);
router.use(authentication);

export default router;
