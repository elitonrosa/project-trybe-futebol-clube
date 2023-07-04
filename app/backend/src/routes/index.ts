import { Router } from 'express';
import teamRoutes from './team.routes';
import loginRoutes from './login.routes';

const router = Router();

router.use('/teams', teamRoutes);
router.use('/login', loginRoutes);

export default router;
