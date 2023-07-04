import { ID, ITeam } from '../interfaces';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { ITeamModel } from '../interfaces/teams/ITeamModel';

export default class TeamModel implements ITeamModel {
  private model = SequelizeTeam;

  async getAll(): Promise<ITeam[]> {
    const teams = await this.model.findAll();
    return teams;
  }

  async getById(id: ID): Promise<ITeam | null> {
    const team = await this.model.findByPk(id);
    if (!team) return null;
    const { teamName } = team;
    return { id, teamName };
  }
}
