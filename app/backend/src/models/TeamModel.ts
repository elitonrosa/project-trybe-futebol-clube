import { ID, ITeam } from '../interfaces';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { ITeamModel } from '../interfaces/teams/ITeamModel';

export default class TeamModel implements ITeamModel {
  private model = SequelizeTeam;

  async getAll(): Promise<ITeam[]> {
    const teams: ITeam[] = await this.model.findAll();
    return teams.map(({ id, teamName }) => ({ id, teamName }));
  }

  async getById(id: ID): Promise<ITeam | null> {
    const team = await this.model.findByPk(id);
    if (!team) return null;
    const { teamName } = team;
    return { id, teamName };
  }
}
