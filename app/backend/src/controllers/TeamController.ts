import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import TeamService from '../services/team/TeamService';

export default class TeamController {
  constructor(private teamService = new TeamService()) {}

  async getAll(_req: Request, res: Response): Promise<Response> {
    const { data } = await this.teamService.getAll();
    return res.status(200).json(data);
  }

  async getById(req: Request, res: Response): Promise<Response> {
    const { data, status } = await this.teamService.getById(Number(req.params.id));
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
