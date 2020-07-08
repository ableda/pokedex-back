import { Router } from 'express';
import health from './health';

const router: Router = Router();

router.use(health);

export default router;
