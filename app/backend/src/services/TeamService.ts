import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ITeam } from '../Interfaces';
import TeamModel from '../models/TeamModel';

export default class TeamService {
  constructor(private bookModel = new TeamModel()) {}

  async getAll(): Promise<ServiceResponse<ITeam[]>> {
    const teams = await this.bookModel.getAll();
    return { status: 'SUCCESSFUL', data: teams };
  }
}
