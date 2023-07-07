import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard/LeaderboardService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) {}

  async getHomeLeaderboard(_req: Request, res: Response): Promise<Response> {
    const { data, status } = await this.leaderboardService.getLeaderboard('HOME');
    return res.status(mapStatusHTTP(status)).json(data);
  }

  async getAwayLeaderboard(_req: Request, res: Response): Promise<Response> {
    const { data, status } = await this.leaderboardService.getLeaderboard('AWAY');
    return res.status(mapStatusHTTP(status)).json(data);
  }

  async getAllLeaderboard(_req: Request, res: Response): Promise<Response> {
    const { data, status } = await this.leaderboardService.getLeaderboard('ALL');
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
