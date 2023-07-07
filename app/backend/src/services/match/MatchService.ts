import { ID, IMatch, NewEntity } from '../../interfaces';
import { ServiceResponse } from '../../interfaces/ServiceResponse';
import { IMatchScore } from '../../interfaces/matches/IMatch';
import MatchModel from '../../models/MatchModel';

export default class MatchService {
  constructor(private matchModel = new MatchModel()) {}

  async getAll(): Promise<ServiceResponse<IMatch[]>> {
    const matches = await this.matchModel.getAll();
    return { status: 'SUCCESSFUL', data: matches };
  }

  async getAllByProgess(
    inProgress: boolean,
  ): Promise<ServiceResponse<IMatch[]>> {
    const matches = await this.matchModel.getAllByProgess(inProgress);
    return { status: 'SUCCESSFUL', data: matches };
  }

  async finishMatch(id: ID): Promise<ServiceResponse<{ message: string }>> {
    const finished = await this.matchModel.update(id, { inProgress: false });
    if (!finished) {
      return {
        status: 'NOT_FOUND',
        data: { message: 'Not found or match already finished' },
      };
    }
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  async updateMatch(
    id: ID,
    score: IMatchScore,
  ): Promise<ServiceResponse<IMatchScore>> {
    const match = await this.matchModel.getById(id);
    if (!match || !match.inProgress) {
      return {
        status: 'NOT_FOUND',
        data: { message: 'Not Found or match already finished' },
      };
    }

    await this.matchModel.update(id, score);
    return { status: 'SUCCESSFUL', data: score };
  }

  async create(
    match: Omit<NewEntity<IMatch>, 'inProgress'>,
  ): Promise<ServiceResponse<IMatch>> {
    if (match.homeTeamId === match.awayTeamId) {
      return {
        status: 'CONFLICT',
        data: {
          message: 'It is not possible to create a match with two equal teams',
        },
      };
    }
    try {
      const newMatch = await this.matchModel.create({ ...match, inProgress: true });
      return { status: 'CREATED', data: newMatch };
    } catch (error) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }
  }
}
