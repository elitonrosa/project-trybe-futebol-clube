import { Router } from 'express';
import teamRoutes from './team.routes';
import loginRoutes from './login.routes';
import matchRoutes from './match.routes';
import leaderboardRoutes from './leaderboard.routes';

const router = Router();

router.use('/teams', teamRoutes);
router.use('/login', loginRoutes);
router.use('/matches', matchRoutes);
router.use('/leaderboard', leaderboardRoutes);

export default router;
