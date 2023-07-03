import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  constructor(private teamService = new TeamService()) {}

  async getAll(_req: Request, res: Response): Promise<Response> {
    const { data } = await this.teamService.getAll();
    return res.status(200).json(data);
  }
}
