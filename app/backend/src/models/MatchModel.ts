import SequelizeMatch from '../database/models/SequelizeMatch';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { ID, IMatch, NewEntity } from '../interfaces';
import { IMatchModel } from '../interfaces/matches/IMatchModel';

export default class MatchModel implements IMatchModel {
  private model = SequelizeMatch;
  private teamModel = SequelizeTeam;

  async getAll(): Promise<IMatch[]> {
    const matches: IMatch[] = await this.model.findAll({
      include: [
        {
          model: this.teamModel,
          as: 'homeTeam',
          attributes: { exclude: ['id'] },
        },
        {
          model: this.teamModel,
          as: 'awayTeam',
          attributes: { exclude: ['id'] },
        },
      ],
    });
    return matches;
  }

  async getAllByProgess(inProgress: boolean): Promise<IMatch[]> {
    const matches: IMatch[] = await this.model.findAll({
      where: { inProgress },
      include: [
        {
          model: this.teamModel,
          as: 'homeTeam',
          attributes: { exclude: ['id'] },
        },
        {
          model: this.teamModel,
          as: 'awayTeam',
          attributes: { exclude: ['id'] },
        },
      ],
    });
    return matches;
  }

  async getAllFinished(): Promise<IMatch[]> {
    const matches: IMatch[] = await this.model.findAll({ where: { inProgress: false } });
    return matches.map(
      ({
        id,
        homeTeamId,
        homeTeamGoals,
        awayTeamId,
        awayTeamGoals,
        inProgress,
      }) => ({
        id,
        homeTeamId,
        homeTeamGoals,
        awayTeamId,
        awayTeamGoals,
        inProgress,
      }),
    );
  }

  async getById(id: ID): Promise<IMatch | null> {
    const match = await this.model.findByPk(id);
    if (!match) return null;
    const { homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress } = match;
    return {
      homeTeamId,
      homeTeamGoals,
      awayTeamId,
      awayTeamGoals,
      inProgress,
      id,
    };
  }

  async update(id: ID, data: Partial<IMatch>): Promise<boolean> {
    const dataUpdated = await this.model.update(data, { where: { id } });
    return dataUpdated[0] === 1;
  }

  async create(data: NewEntity<IMatch>): Promise<IMatch> {
    const match = await this.model.create(data);
    const {
      homeTeamId,
      homeTeamGoals,
      awayTeamId,
      awayTeamGoals,
      inProgress,
      id,
    } = match;
    return {
      homeTeamId,
      homeTeamGoals,
      awayTeamId,
      awayTeamGoals,
      inProgress,
      id,
    };
  }
}
