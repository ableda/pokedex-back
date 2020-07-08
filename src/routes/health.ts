import { Router } from 'express';
import { getHealthPing } from '../controllers/health';

const router: Router = Router();

router.get('/health/ping', getHealthPing);

export default router;
