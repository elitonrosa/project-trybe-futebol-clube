import { Router } from 'express';
import teamRoutes from './team.routes';
import loginRoutes from './login.routes';
import matchRoutes from './match.routes';

const router = Router();

router.use('/teams', teamRoutes);
router.use('/login', loginRoutes);
router.use('/matches', matchRoutes);

export default router;
