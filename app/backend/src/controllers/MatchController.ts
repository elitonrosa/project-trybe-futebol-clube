import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchController {
  constructor(private matchService = new MatchService()) {}

  async getAll(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;
    if (inProgress === 'true' || inProgress === 'false') {
      const { data, status } = await this.matchService.getAllByProgess(inProgress === 'true');
      return res.status(mapStatusHTTP(status)).json(data);
    }
    const { data, status } = await this.matchService.getAll();
    return res.status(mapStatusHTTP(status)).json(data);
  }

  async finishMatch(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { data, status } = await this.matchService.finishMatch(Number(id));
    return res.status(mapStatusHTTP(status)).json(data);
  }

  async updateMatch(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { data, status } = await this.matchService.updateMatch(Number(id), {
      homeTeamGoals,
      awayTeamGoals,
    });
    return res.status(mapStatusHTTP(status)).json(data);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const newMatch = req.body;
    const { data, status } = await this.matchService.create(newMatch);
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
