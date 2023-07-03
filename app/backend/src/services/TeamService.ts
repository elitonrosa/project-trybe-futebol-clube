import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ID, ITeam } from '../Interfaces';
import TeamModel from '../models/TeamModel';

export default class TeamService {
  constructor(private teamModel = new TeamModel()) {}

  async getAll(): Promise<ServiceResponse<ITeam[]>> {
    const teams = await this.teamModel.getAll();
    return { status: 'SUCCESSFUL', data: teams };
  }

  async getById(id: ID): Promise<ServiceResponse<ITeam>> {
    const team = await this.teamModel.getById(id);
    if (!team) return { status: 'NOT_FOUND', data: { message: 'Not found' } };
    const { teamName } = team;
    return { status: 'SUCCESSFUL', data: { id, teamName } };
  }
}
